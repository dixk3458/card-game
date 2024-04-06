export function shuffle(cards) {
  cards.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * index);
    [cards[randomIndex], cards[index]] = [cards[index], cards[randomIndex]];
  });
}
