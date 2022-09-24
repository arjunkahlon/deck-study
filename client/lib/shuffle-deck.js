import { shuffle, groupBy } from 'lodash';

export default function shuffleDeck(cards) {
  const cardsCopy = [...cards];

  const shuffledCardsCopy = shuffle(cardsCopy);

  const groupedCards = groupBy(shuffledCardsCopy, 'difficulty');
  return groupedCards;
}
