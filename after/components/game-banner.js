import { config } from '../config.js';

export class GameBanner extends HTMLElement {
  connectedCallback() {
    this.classList.add('banner');
    const textContainer = document.createElement('p');
    textContainer.textContent = 'Finish 🎉';

    this.append(textContainer);
  }
}

customElements.define(config.gameBanner, GameBanner);
