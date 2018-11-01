import React from "react";
import { emojiFullList } from "../list-of-cards";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import cx from "classnames";

import GameCard from "./GameCard";

const style = {
	emptyCell: {
		opacity: "0",
		pointerEvents: "none",
	},
	emptyCellHard: {
		gridRow: "3",
		gridColumn: "3",
	},
	emptyCellEasy: {
		gridRow: "2",
		gridColumn: "2",
	},
};
class CardGenerator extends React.PureComponent {
	state = {
		displayCards: false,
	};
	generateLevel = () => {
		const { difficulty } = this.props;

		switch (difficulty) {
			case 2:
				this.generateCards(24);
				break;
			case 1:
				this.generateCards(16);
				break;
			default:
				this.generateCards(8);
				break;
		}
	};

	generateCards = (numberOfCards = 12) => {
		const pickUniqueIndexes = list => {
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
			.map(emojiIndex => {
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
		const cardList = shuffledList.map(cardContent => {
			return { card: cardContent, revealed: false, clicked: false };
		});

		this.props.handleCardGeneration(cardList);
	};

	componentDidMount() {
		this.generateLevel();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.shouldRestart) {
			this.generateLevel();
		}
	}

	static getDerivedStateFromProps(props) {
		if (props.cardList) {
			return { displayCards: true };
		}
		return null;
	}

	render() {
		const { cardList, activeCard, difficulty, handleCardClicks, previousTwoCards, classes } = this.props;
		const { displayCards } = this.state;

		const emptyCellClasses = cx(classes.emptyCell, difficulty === 2 ? classes.emptyCellHard : classes.emptyCellEasy);

		// TODO Add CSS transition on start and restart
		if (displayCards && cardList) {
			const listOfCards = cardList.map((card, index) => (
				<GameCard
					difficulty={difficulty}
					handleCardClicks={handleCardClicks}
					key={index}
					index={index}
					cardContent={card.card}
					revealed={card.revealed}
					previouslyActive={Boolean(previousTwoCards.indexOf(index) !== -1)}
					isActive={Boolean(activeCard.index === index)}
				/>
			));

			return (
				<>
					{listOfCards}
					{difficulty === 2 || difficulty === 0 ? <div className={emptyCellClasses}>Hi there.</div> : null}
				</>
			);
		}
		return null;
	}
}

CardGenerator.propTypes = {
	activeCard: PropTypes.exact({
		card: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
	}),
	cardList: PropTypes.array.isRequired,
	difficulty: PropTypes.number.isRequired,
	handleCardClicks: PropTypes.func.isRequired,
	previousTwoCards: PropTypes.array.isRequired,
};

export default injectSheet(style)(CardGenerator);
