import React from "react";
import injectSheet from "react-jss";
import cx from "classnames";
import PropTypes from "prop-types";

import CardGenerator from "./CardGenerator";

const style = {
  gameGrid: {
    display: "grid",
    maxWidth: "50em",
    margin: "auto",
    gridTemplateColumns: (props) =>
      `repeat(auto-fill, ${props.difficulty === "hard" ? "4" : "6.5"}em)`,

    gridAutoRows: (props) => `${props.difficulty === "hard" ? "4" : "6.5"}em`,
    justifyContent: "center",
    gridGap: "1em",
  },
  easyGrid: {
    maxWidth: "32em",
  },
};

class GameCardGrid extends React.Component {
  state = {
    difficulty: this.props.difficulty,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.shouldRestart) {
      return {difficulty: props.difficulty};
    }
    return null;
  }
  render() {
    const {
      classes,
      handleCardGeneration,
      handleCardClicks,
      cardList,
      displayCards,
      difficulty,
      activeCard,
      previousTwoCards,
      shouldRestart,
    } = this.props;
    const gridClasses = cx(classes.gameGrid, this.state.difficulty === "easy" && classes.easyGrid);

    return (
      <div className={gridClasses}>
        <CardGenerator
          difficulty={difficulty}
          shouldRestart={shouldRestart}
          handleCardClicks={handleCardClicks}
          handleCardGeneration={handleCardGeneration}
          cardList={cardList}
          displayCards={displayCards}
          activeCard={activeCard}
          previousTwoCards={previousTwoCards}
        />
      </div>
    );
  }
}

GameCardGrid.propTypes = {
  handleCardGeneration: PropTypes.func.isRequired,
  handleCardClicks: PropTypes.func.isRequired,
  cardList: PropTypes.array.isRequired,
  displayCards: PropTypes.bool.isRequired,
  difficulty: PropTypes.string.isRequired,
  activeCard: PropTypes.exact({
    card: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }),
  previousTwoCards: PropTypes.array.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
};
export default injectSheet(style)(GameCardGrid);
