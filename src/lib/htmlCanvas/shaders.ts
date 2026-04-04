// ─── Shared vertex shader (fullscreen quad) ───

export const FULLSCREEN_VS = /* glsl */ `#version 300 es
in vec2 aPosition;
out vec2 vUV;
void main() {
  vUV = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

// ─── Tier 1 + 3: CRT Terminal + Hover Haze ───

export const CRT_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uHover;

in vec2 vUV;
out vec4 fragColor;

vec2 barrel(vec2 uv, float k) {
  vec2 d = uv - 0.5;
  return uv + d * dot(d, d) * k;
}

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);

  // Barrel distortion
  vec2 buv = barrel(uv, 0.06);
  if (buv.x < 0.0 || buv.x > 1.0 || buv.y < 0.0 || buv.y > 1.0) {
    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Chromatic aberration — stronger at edges
  float edge = dot(buv - 0.5, buv - 0.5);
  float aberr = 0.0012 + edge * 0.003;
  float r = texture(uContent, buv + vec2(aberr, 0.0)).r;
  float g = texture(uContent, buv).g;
  float b = texture(uContent, buv - vec2(aberr, 0.0)).b;
  float a = texture(uContent, buv).a;
  vec3 color = vec3(r, g, b);

  // Scanlines
  float scan = 0.96 + 0.04 * sin(gl_FragCoord.y * 1.6);
  color *= scan;

  // Moving horizontal scan band
  float band = smoothstep(0.0, 0.012, abs(fract(uv.y - uTime * 0.035) - 0.5));
  color *= 0.97 + 0.03 * band;

  // Phosphor glow — directional bloom on green/cyan signal colours
  float glow = 0.0;
  float ps = 2.5 / uResolution.x;
  for (float i = -3.0; i <= 3.0; i += 1.0) {
    vec4 s = texture(uContent, buv + vec2(i * ps, 0.0));
    float greenness = s.g - max(s.r, s.b);
    glow += max(0.0, greenness) * (0.22 - abs(i) * 0.03);
  }
  color += vec3(glow * 0.25, glow * 0.7, glow * 0.35);

  // Vignette
  float vig = 1.0 - edge * 1.4;
  color *= clamp(vig, 0.0, 1.0);

  // ── Tier 3: Hover heat-haze ──
  if (uHover > 0.01) {
    vec2 diff = uv - uMouse;
    float dist = length(diff);
    float ripple = sin(dist * 50.0 - uTime * 6.0) * exp(-dist * 10.0) * uHover * 0.006;
    vec2 haze = buv + normalize(diff + 0.0001) * ripple;
    vec3 hazeColor = texture(uContent, haze).rgb;
    color = mix(color, hazeColor, uHover * 0.4);
  }

  fragColor = vec4(color, a);
}
`

// ─── Tier 2: Glitch Transition ───

export const GLITCH_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;
uniform float uProgress;   // 0 → 1
uniform vec2 uResolution;
uniform float uSeed;

in vec2 vUV;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);
  float intensity = sin(uProgress * 3.14159) * 0.9;

  // Horizontal slice displacement
  float sliceY = floor(uv.y * 24.0) / 24.0;
  float sliceRand = hash(vec2(sliceY, uSeed + floor(uProgress * 20.0)));
  float disp = (sliceRand - 0.5) * intensity * 0.18;
  vec2 guv = uv + vec2(disp, 0.0);

  // Block corruption
  vec2 block = floor(uv * vec2(10.0, 16.0));
  float blockRand = hash(block + uSeed);
  if (blockRand > 1.0 - intensity * 0.25) {
    guv = fract(guv + hash(block + uSeed * 2.0) * 0.4);
  }

  // Colour channel separation
  float sep = intensity * 0.025;
  float r = texture(uContent, guv + vec2(sep, 0.0)).r;
  float g = texture(uContent, guv).g;
  float b = texture(uContent, guv - vec2(sep, 0.0)).b;

  // Noise
  float n = hash(uv * uResolution + uProgress * 137.0) * intensity * 0.18;

  vec3 color = vec3(r, g, b) + n;
  fragColor = vec4(color, 1.0);
}
`

// ─── Tier 4: Phosphor Bloom (multi-pass) ───

export const BLOOM_THRESHOLD_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;
uniform float uThreshold;

in vec2 vUV;
out vec4 fragColor;

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);
  vec4 c = texture(uContent, uv);
  float greenness = c.g - max(c.r, c.b);
  float bright = max(0.0, greenness - uThreshold);
  fragColor = vec4(vec3(bright * 0.3, bright, bright * 0.4), 1.0);
}
`

export const BLOOM_BLUR_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uSource;
uniform vec2 uDirection;   // (1/w, 0) or (0, 1/h)

in vec2 vUV;
out vec4 fragColor;

void main() {
  vec4 sum = vec4(0.0);
  sum += texture(uSource, vUV + uDirection * -3.0) * 0.06;
  sum += texture(uSource, vUV + uDirection * -2.0) * 0.12;
  sum += texture(uSource, vUV + uDirection * -1.0) * 0.20;
  sum += texture(uSource, vUV)                     * 0.24;
  sum += texture(uSource, vUV + uDirection *  1.0) * 0.20;
  sum += texture(uSource, vUV + uDirection *  2.0) * 0.12;
  sum += texture(uSource, vUV + uDirection *  3.0) * 0.06;
  fragColor = sum;
}
`

export const BLOOM_COMPOSITE_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;
uniform sampler2D uBloom;
uniform float uStrength;

in vec2 vUV;
out vec4 fragColor;

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);
  vec4 base = texture(uContent, uv);
  vec4 bloom = texture(uBloom, vUV);
  fragColor = base + bloom * uStrength;
}
`

// ─── Tier 5: Signal Static ───

export const STATIC_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;
uniform float uIntensity;  // 1 → 0 (decays)
uniform float uTime;
uniform vec2 uResolution;

in vec2 vUV;
out vec4 fragColor;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);
  vec4 color = texture(uContent, uv);

  if (uIntensity < 0.005) {
    fragColor = color;
    return;
  }

  // Random static
  float n = noise(uv * uResolution + uTime * 200.0);
  color.rgb = mix(color.rgb, vec3(n), uIntensity * 0.45);

  // Horizontal scan displacement
  float sliceY = floor(uv.y * 8.0) / 8.0;
  float d = (noise(vec2(sliceY, uTime * 80.0)) - 0.5) * uIntensity * 0.06;
  vec4 shifted = texture(uContent, uv + vec2(d, 0.0));
  color = mix(color, shifted, uIntensity * 0.55);

  fragColor = color;
}
`

// ─── Tier 6: Per-Element Hover ───

export const HOVER_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;   // normalised 0-1 within element
uniform float uHover;  // 0-1 intensity (smoothly lerped)
uniform int uMode;     // 0 default, 1 button

in vec2 vUV;
out vec4 fragColor;

void main() {
  vec2 uv = vec2(vUV.x, 1.0 - vUV.y);

  // Fast exit when idle
  if (uHover < 0.005) {
    fragColor = texture(uContent, uv);
    return;
  }

  vec2 mouse = vec2(uMouse.x, 1.0 - uMouse.y);
  vec2 diff = uv - mouse;
  float dist = length(diff);
  vec2 dir = normalize(diff + 0.0001);

  // ── 1. Chromatic dispersion radiating from cursor ──
  //    RGB channels split outward like a prism held at the pointer
  float aberr = uHover * 0.010 * smoothstep(0.45, 0.0, dist);
  vec2 ao = dir * aberr;
  float r = texture(uContent, uv + ao).r;
  float g = texture(uContent, uv).g;
  float b = texture(uContent, uv - ao).b;
  vec3 color = vec3(r, g, b);

  // ── 2. Lens warp — subtle magnification near cursor ──
  float lens = uHover * 0.018 * exp(-dist * 8.0);
  vec2 lensUV = uv + diff * lens;
  vec3 lensCol = texture(uContent, lensUV).rgb;
  color = mix(color, lensCol, 0.35 * uHover);

  // ── 3. Scan-line reveal — faint CRT lines materialise near pointer ──
  float proximity = smoothstep(0.35, 0.0, dist) * uHover;
  float scanLine = 0.5 + 0.5 * sin(gl_FragCoord.y * 2.8 + uTime * 2.4);
  color *= 1.0 - proximity * 0.07 * scanLine;

  // ── 4. Phosphor edge glow — border lights up on hover ──
  float edgeDist = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  float edgeGlow = uHover * smoothstep(0.025, 0.0, edgeDist) * 0.55;
  color += vec3(0.06, 0.32, 0.14) * edgeGlow;

  // ── 5. Cursor spotlight — soft brightness lift ──
  float lift = uHover * 0.09 * exp(-dist * 5.5);
  color += lift;

  // ── 6. Refocus vignette — edges dim to draw the eye ──
  float vig = 1.0 - uHover * 0.15 * dot(uv - 0.5, uv - 0.5) * 2.0;

  // ── Button mode: high-intensity spectral hover ──
  if (uMode == 1) {
    // Animated spectral refraction around cursor.
    float prism = (0.5 + 0.5 * sin(uTime * 3.0 + dist * 72.0));
    float spectral = uHover * smoothstep(0.60, 0.0, dist) * (0.007 + prism * 0.011);
    vec2 spectralOffset = dir * spectral;
    float sr = texture(uContent, uv + spectralOffset * 1.8).r;
    float sg = texture(uContent, uv + vec2(-spectralOffset.y, spectralOffset.x) * 0.75).g;
    float sb = texture(uContent, uv - spectralOffset * 1.35).b;
    vec3 spectralCol = vec3(sr, sg, sb);
    color = mix(color, spectralCol, 0.68 * uHover);

    // Cursor-reactive distortion field.
    vec2 tangent = vec2(-dir.y, dir.x);
    float ripple = sin(dist * 96.0 - uTime * 11.0) * exp(-dist * 6.8) * uHover * 0.012;
    vec2 warpUV = uv + tangent * ripple + diff * (uHover * 0.010 * exp(-dist * 4.4));
    vec3 warped = texture(uContent, warpUV).rgb;
    color = mix(color, warped, 0.44 * uHover);

    // Traveling RGB edge glow.
    float edgeBand = smoothstep(0.045, 0.0, edgeDist);
    float edgePulse = 0.5 + 0.5 * sin((uv.x + uv.y) * 46.0 - uTime * 8.2);
    vec3 edgeRainbow = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + uTime * 2.7 + dist * 26.0);
    color += edgeRainbow * edgeBand * edgePulse * uHover * 0.38;

    // Stronger spotlight for "magnetic" feel, but keep detail legible.
    color += edgeRainbow * exp(-dist * 3.2) * uHover * 0.09;
    vig = 1.0 - uHover * 0.09 * dot(uv - 0.5, uv - 0.5) * 1.6;
  }

  color *= clamp(vig, 0.84, 1.05);
  color = clamp(color, 0.0, 1.0);

  float a = texture(uContent, uv).a;
  fragColor = vec4(color, a);
}
`

// ─── Passthrough (for inactive states) ───

export const PASSTHROUGH_FS = /* glsl */ `#version 300 es
precision highp float;

uniform sampler2D uContent;

in vec2 vUV;
out vec4 fragColor;

void main() {
  fragColor = texture(uContent, vec2(vUV.x, 1.0 - vUV.y));
}
`
