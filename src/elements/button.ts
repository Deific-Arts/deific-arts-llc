import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

declare const Snap: any;
declare const mina: any;

const styles = css`
  :host {
    cursor: pointer;
    display: inline-flex;
    margin-top: 2rem;
  }

  svg,
  span {
    cursor: pointer;
  }

  .button-wrap {
    margin-bottom: 3em;
  }

  .button {
    background: none;
    border: none;
    width: 248px;
    height: 72px;
    outline: none;
    position: relative;
    margin: 1em;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent; /* For some Androids */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .button--round {
    width: 150px;
    height: 150px;
  }

  .button__text {
    display: block;
    padding: 10px;
    text-align: center;
    position: relative;
    z-index: 100;
    font-size: 1.25em;
    color: #fff;
    font-weight: bold;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .morph-shape {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .button--line .morph-shape svg {
    fill: var(--color-secondary);
    stroke: none;
    stroke-width: 1px;
    stroke-linecap: round;
  }

  .button--line:nth-child(2) .morph-shape svg {
    fill: #938edc;
  }

  .button--fill .morph-shape svg {
    fill: #44474d;
  }

  .button--fill:nth-child(4) .morph-shape svg {
    fill: #202020;
  }

  .button--round .morph-shape svg {
    stroke-width: 7px;
  }

  /* Example for effect */
  .button--anim-1 .button__text {
    -webkit-transition: -webkit-transform 0.15s;
    transition: transform 0.15s;
  }

  .button--anim-1:active .button__text {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }
`;

type Speed = { reset: number; active: number };
type Easing = { reset: any; active: any };

type SVGButtonOptions = {
  speed?: Partial<Speed>;
  easing?: Partial<Easing>;
};

type SVGButtonResolvedOptions = {
  speed: Speed;
  easing: Easing;
};

@customElement("deific-button")
export default class DeificButton extends LitElement {
  static styles = [styles];

  firstUpdated() {
    // Simple typed "merge" helper
    const merge = <T extends Record<string, any>, U extends Record<string, any>>(
      a: T,
      b: U
    ): T & U => {
      (Object.keys(b) as Array<keyof U>).forEach((key) => {
        (a as any)[key] = b[key];
      });
      return a as T & U;
    };

    class SVGButton {
      el: HTMLButtonElement;
      options: SVGButtonResolvedOptions;

      private shapeEl!: HTMLSpanElement;
      private pathEl!: any;
      private paths!: { reset: string; active: string };

      constructor(el: HTMLButtonElement, options?: SVGButtonOptions) {
        this.el = el;

        const defaults: SVGButtonResolvedOptions = {
          speed: { reset: 800, active: 150 },
          easing: { reset: mina.elastic, active: mina.easein },
        };

        // merge defaults + options (including nested speed/easing)
        this.options = merge(defaults, {}) as SVGButtonResolvedOptions;
        if (options?.speed) this.options.speed = merge(this.options.speed, options.speed);
        if (options?.easing) this.options.easing = merge(this.options.easing, options.easing);

        this.init();
      }

      private init() {
        const shapeEl = this.el.querySelector<HTMLSpanElement>("span.morph-shape");
        if (!shapeEl) return;
        this.shapeEl = shapeEl;

        const svg = this.shapeEl.querySelector<SVGSVGElement>("svg");
        if (!svg) return;

        const s = Snap(svg);
        this.pathEl = s.select("path");
        this.paths = {
          reset: this.pathEl.attr("d"),
          active: this.shapeEl.getAttribute("data-morph-active") ?? "",
        };

        this.initEvents();
      }

      private initEvents() {
        const down = this.down.bind(this);
        const up = this.up.bind(this);

        this.el.addEventListener("mousedown", down);
        this.el.addEventListener("touchstart", down, { passive: true });

        this.el.addEventListener("mouseup", up);
        this.el.addEventListener("touchend", up);
        this.el.addEventListener("mouseout", up);
      }

      private down() {
        this.pathEl
          .stop()
          .animate({ path: this.paths.active }, this.options.speed.active, this.options.easing.active);
      }

      private up() {
        this.pathEl
          .stop()
          .animate({ path: this.paths.reset }, this.options.speed.reset, this.options.easing.reset);
      }
    }

    // IMPORTANT: since this is a web component, scope to *this* component
    // (so multiple instances don't conflict)
    const root = this.renderRoot as HTMLElement;

    root
      .querySelectorAll<HTMLButtonElement>("button.button--effect-1")
      .forEach((el) => new SVGButton(el));

    root
      .querySelectorAll<HTMLButtonElement>("button.button--effect-2")
      .forEach(
        (el) =>
          new SVGButton(el, {
            speed: { reset: 650, active: 650 },
            easing: { reset: mina.elastic, active: mina.elastic },
          })
      );
  }

  render() {
    return html`
      <button class="button button--line button--effect-1">
        <span
          class="morph-shape"
          data-morph-active="M287,95.25c0,11.046-5.954,19.75-17,19.75c0,0-90-4-120-4s-120,4-120,4c-11.046,0-17.25-9.5-17.25-20.5c0-8.715,0.25-10.75,0.25-34s-0.681-26.257-1-33.75C11.5,15,18.954,10,30,10c0,0,90,3,120,3s120-3,120-3c11.046,0,17.75,6.5,17,20c-0.402,7.239,0,6.75,0,30.5C287,83.5,287,84.75,287,95.25z"
        >
          <svg width="100%" height="100%" viewBox="0 0 300 125" preserveAspectRatio="none">
            <path
              d="M290,95c0,11.046-8.954,20-20,20c0,0-90,0-120,0s-120,0-120,0c-11.046,0-20-9-20-20c0-8.715,0-25.875,0-34.5c0-7.625,0-22.774,0-30.5c0-11.625,8.954-20,20-20c0,0,90,0,120,0s120,0,120,0c11.046,0,20,8.954,20,20c0,7.25,0,22.875,0,30.5C290,69.125,290,84.5,290,95z"
            />
          </svg>
        </span>
        <span class="button__text"><slot></slot></span>
      </button>
    `;
  }
}
