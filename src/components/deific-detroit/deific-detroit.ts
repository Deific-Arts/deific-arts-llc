import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './styles';

@customElement('deific-detroit')
export default class DeificDetroit extends LitElement {
  static get styles() {
    return [styles]
  }

  @property()
  resolution: string = '768x1178';

  @query('img')
  image!: HTMLElement;

  firstUpdated() {
    this.setResolution();
    this.image.style.display = 'block'; // lazy load
  }

  render() {
    return html `
      <img src="/detroit-${this.resolution}.webp" loading="lazy" alt="The Detroit riverfront." style="display:none;" />
    `
  }

  setResolution() {
    const mediaQuery = window.matchMedia('(min-width: 769px)');

    if (mediaQuery.matches) {
      this.resolution = '3840x2160';
    }
  }
}
