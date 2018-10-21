import React from "react";
import {emojiFullList} from "../list-of-cards";
import GameCard from "./GameCard";

class CardGenerator extends React.Component {
  generateCards = () => {
    const {difficulty} = this.props;
    switch (difficulty) {
      case "hard":
        console.log("Hard Case TBD");
        break;
      case "medium":
        console.log("Medium Case TBD");
        break;
      default:
        this.generateEasyCards();
        break;
    }
  };
  generateEasyCards = (numberOfCards = 12) => {
    const pickUniqueIndexes = (list) => {
      let nums = list.slice();
      let num;
      do {
        num = randomIndex();
      } while (nums.indexOf(num) !== -1);
      nums.push(num);

      return nums;
    };
    const randomIndex = () => Math.round(Math.random() * 100) % emojiFullList.length;

    let emojiIndexes = [];
    for (let i = 0; i < numberOfCards / 2; i++) {
      emojiIndexes = pickUniqueIndexes(emojiIndexes);
    }

    let emojiListDoubled = emojiIndexes
      .map((emojiIndex) => {
        return emojiFullList[emojiIndex];
      })
      .reduce((acc, current) => {
        return acc.concat([current, current]);
      }, []);

    function shuffle(array) {
      let newArray = array.slice();
      let counter = array.length;
      while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = newArray[counter];
        newArray[counter] = newArray[index];
        newArray[index] = temp;
      }
      return newArray;
    }
    const shuffledList = shuffle(emojiListDoubled);
    const cardList = shuffledList.map((content) => {
      return {card: content, revealed: false, clicked: false};
    });
    this.props.handleCardGeneration(cardList);
  };
  componentDidMount() {
    this.generateCards();
  }

  render() {
    const {
      paused,
      handleCardClicks,
      displayCards,
      cardList,
      activeCard,
      previousTwoCards,
    } = this.props;

    if (displayCards && cardList) {
      const listOfCards = cardList.map((card, index) => (
        <GameCard
          paused={paused}
          handleCardClicks={handleCardClicks}
          key={index}
          index={index}
          content={card.card}
          revealed={card.revealed}
          previouslyActive={Boolean(previousTwoCards.indexOf(index) !== -1)}
          isActive={Boolean(activeCard.index === index)}
        />
      ));
      return listOfCards;
    }
    return null;
  }
}

export default CardGenerator;
