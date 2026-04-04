declare module 'heerich' {
  export class Heerich {
    constructor(options?: Record<string, unknown>)
    applyGeometry(options: Record<string, unknown>): void
    toSVG(options?: Record<string, unknown>): string
  }
}

declare module 'heerich/src/heerich.js' {
  export class Heerich {
    constructor(options?: Record<string, unknown>)
    applyGeometry(options: Record<string, unknown>): void
    toSVG(options?: Record<string, unknown>): string
  }
}

declare module 'heerich-runtime' {
  export class Heerich {
    constructor(options?: Record<string, unknown>)
    applyGeometry(options: Record<string, unknown>): void
    toSVG(options?: Record<string, unknown>): string
  }
}
