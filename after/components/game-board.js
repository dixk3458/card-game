import { config } from '../config.js';
import { shuffle } from '../utils/shuffle.js';
import { GameCard } from './game-card.js';

export class GameBoard extends HTMLElement {
  // 게임의 전반적인 데이터 및 규칙을 설정한다.

  #body = document.querySelector('body');
  #level = config.level.hard;
  #cards = [];
  #lock = false;
  #firstCard = null;
  #secondCard = null;
  #score;
  #win = false;

  async connectedCallback() {
    console.log('Game init');

    this.classList.add('board');

    this.#score = document.createElement(config.gameScore);
    this.#score.setAttribute('startScore', this.#level);

    // json으로 받아온 카드 데이터가 담긴 배열이다.
    // 해당 배열을 이용해 실제 카드 Element를 만들어야한다.
    const cardInfoList = await this.#fetchCardInfoList(this.#level);
    this.#cards = this.#createCard(cardInfoList);

    // 카드의 순서를 섞어주자
    shuffle(this.#cards);

    this.#body.append(this.#score);
    this.append(...this.#cards);
    this.#bindEvents();
  }

  async #fetchCardInfoList(count) {
    // main에서 import하기때문에 main.js를 기준으로 경로
    const response = await fetch('./data/cardData.json');
    const cards = await response.json();

    return cards.slice(0, count);
  }

  #createCard(cardInfoList) {
    const cards = [...cardInfoList, ...cardInfoList].map(
      ({ imagePath, name }) => {
        const card = document.createElement(config.gameCard); // 커스텀 엘레멘트를 이용해 만들면 해당 컴포넌트에서 해주었던 설정값들 들어감
        card.setAttribute('imagePath', imagePath);
        card.setAttribute('name', name);

        return card;
      }
    );
    return cards;
  }

  #bindEvents() {
    this.addEventListener('click', event => {
      const gameCard = event.target.closest(config.gameCard);
      if (!gameCard) {
        return;
      }
      this.#onClickCard(gameCard);
    });
  }

  #onClickCard(gameCard) {
    if (this.#lock) {
      return;
    }

    if (this.#firstCard === gameCard) {
      return;
    }

    if (gameCard.isDisabled) {
      return;
    }

    this.#lock = true;
    gameCard.flip();

    if (!this.#firstCard) {
      this.#firstCard = gameCard;
      this.#lock = false;
      return;
    }

    this.#secondCard = gameCard;
    this.#checkForMatch();
  }

  #checkForMatch() {
    const isMatch =
      this.#firstCard.dataset.name === this.#secondCard.dataset.name;

    if (isMatch) {
      this.#firstCard.disable();
      this.#secondCard.disable();

      this.#score.increase();
      this.#resetSelection();
      this.#isWin();
      return;
    }

    setTimeout(() => {
      this.#firstCard.flip();
      this.#secondCard.flip();

      this.#resetSelection();
    }, 800);
  }

  #resetSelection() {
    this.#firstCard = null;
    this.#secondCard = null;

    this.#lock = false;
  }

  #isWin() {
    if (this.#score.score > 0) {
      return;
    }

    const banner = document.createElement(config.gameBanner);
    console.log(banner);

    this.#body.append(banner);
  }
}

customElements.define(config.gameBoard, GameBoard);
