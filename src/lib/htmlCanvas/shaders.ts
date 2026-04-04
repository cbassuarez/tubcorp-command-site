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
