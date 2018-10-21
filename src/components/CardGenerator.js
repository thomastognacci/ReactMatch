import React from "react";
import {emojiFullList} from "../list-of-cards";
import GameCard from "./GameCard";

class CardGenerator extends React.Component {
  state = {
    displayCards: false,
  };
  generateCards = () => {
    const {difficulty} = this.props;
    console.log("Generating cards", difficulty);

    switch (difficulty) {
      case "hard":
        this.generateSetOfCards(36);
        break;
      case "medium":
        this.generateSetOfCards(24);
        break;
      default:
        this.generateSetOfCards(12);
        break;
    }
  };
  generateSetOfCards = (numberOfCards = 12) => {
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
  static getDerivedStateFromProps(props, state) {
    if (props.cardList) {
      return {displayCards: true};
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldRestart) {
      this.generateCards();
    }
  }

  render() {
    const {paused, handleCardClicks, cardList, activeCard, previousTwoCards} = this.props;

    const {displayCards} = this.state;

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
