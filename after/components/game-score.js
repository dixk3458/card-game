import { config } from '../config.js';

export class GameScore extends HTMLElement {
  // 내부 상태로 score
  // 하지만 외부에선 접근 X
  #score;
  #scoreElement;

  connectedCallback() {
    this.classList.add('scoreContainer');
    this.#score = this.getAttribute('startScore');

    this.#scoreElement = document.createElement('span');
    this.#scoreElement.classList.add('score');
    this.#scoreElement.textContent = this.#score;

    this.append(this.#scoreElement);
  }

  increase() {
    this.#score = this.#score - 1;
    this.#scoreElement.textContent = this.#score;
  }

  get score() {
    return this.#score;
  }
}

customElements.define(config.gameScore, GameScore);
