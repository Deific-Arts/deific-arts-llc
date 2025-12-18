declare module 'typewriter-effect/dist/core' {
  interface TypewriterOptions {
    strings?: string[];
    autoStart?: boolean;
    loop?: boolean;
    deleteSpeed?: number;
    typeSpeed?: number;
    [key: string]: any;
  }

  class Typewriter {
    constructor(element: HTMLElement, options?: TypewriterOptions);
  }

  export default Typewriter;
}
