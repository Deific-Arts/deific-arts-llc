import { css } from 'lit';

const styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }

    :host::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: 100%;
      opacity: 0.9;
      background: var(--color-background);
    }

    img {
      min-height: 100vh;
    }

    @media screen and (min-width: 769px) {
      :host::after {
        opacity: 0.95;
      }

      img {
        max-width: 100%;
      }
    }
`;

export default styles;
