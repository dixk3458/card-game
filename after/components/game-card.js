import { config } from '../config.js';

export class GameCard extends HTMLElement {
  // 게임 카드
  // 1. isDisabled
  // 2. flip

  #isDisabled = false;

  // 외부에서 내부 프로퍼티에 접근은 안되지만, 값은 이용할 수 있어야한다.

  connectedCallback() {
    this.classList.add('card');
    this.dataset.name = this.getAttribute('name');

    const frontImage = document.createElement('img');
    frontImage.classList.add('front');
    frontImage.src = this.getAttribute('imagePath');

    const backImage = document.createElement('img');
    backImage.classList.add('back');
    backImage.src = config.questionPath;

    // 여러 노드를 한번에 추가하기 위해 append 사용
    this.append(frontImage, backImage);
  }

  flip() {
    // 외부에서 호출하면 카드를 뒤집어라 명령하는것이다.
    // 즉 카드의 클래스 이름을 토글해주면됨
    this.classList.toggle('flip');
  }

  disable() {
    this.#isDisabled = true;
  }

  get isDisabled() {
    return this.#isDisabled;
  }
}

customElements.define(config.gameCard, GameCard);
