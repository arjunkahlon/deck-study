import { shuffle, groupBy } from 'lodash';

export default function shuffleDeck(cards) {
  const cardsCopy = [...cards];
  const shuffledCardsCopy = shuffle(cardsCopy);
  const combinedCards = [];

  const groupedCards = groupBy(shuffledCardsCopy, 'difficulty');
  const reversedCardKeys = Object.keys(groupedCards).reverse();

  reversedCardKeys.forEach(key => {
    combinedCards.push(...groupedCards[key]);
  });

  return combinedCards;
}
