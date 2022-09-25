import { shuffle, groupBy } from 'lodash';

export default function shuffleDeck(cards) {
  const cardsCopy = [...cards];
  const shuffledCardsCopy = shuffle(cardsCopy);
  let combinedCards = [];

  const groupedCards = groupBy(shuffledCardsCopy, 'difficulty');
  const reversedCardKeys = Object.keys(groupedCards).reverse();

  reversedCardKeys.forEach(key => {
    combinedCards = combinedCards.concat(groupedCards[key]);
  });

  return combinedCards;
}
