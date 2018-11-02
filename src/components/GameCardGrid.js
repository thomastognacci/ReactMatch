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
    justifyContent: "center",
    gridGap: "1em",
  },
  easyGrid: {
    gridTemplateColumns: "repeat(3, 8.5em)",
    gridAutoRows: "8.5em",
    "@media (max-width: 30em)": {
      gridTemplateColumns: "repeat(3, calc(33vw - 1.5em))",
      gridAutoRows: "calc(33vw - 1.5em)",
    },
  },
  mediumGrid: {
    gridTemplateColumns: "repeat(4, 6.5em)",
    gridAutoRows: "6.5em",
    "@media (max-width: 30em)": {
      gridTemplateColumns: "repeat(4, calc(25vw - 1.5em))",
      gridAutoRows: "calc(25vw - 1.5em)",
    },
  },
  hardGrid: {
    gridTemplateColumns: "repeat(5, 5em)",
    gridAutoRows: "5em",

    "@media (max-width: 35em)": {
      gridTemplateColumns: "repeat(5, calc(20vw - 1.5em))",
      gridAutoRows: "calc(20vw - 1.5em)",
    },
  },
};

class GameCardGrid extends React.PureComponent {
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
    const gridClasses = cx(
      classes.gameGrid,
      difficulty === 0 && classes.easyGrid,
      difficulty === 1 && classes.mediumGrid,
      difficulty === 2 && classes.hardGrid,
    );

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
  difficulty: PropTypes.number.isRequired,
  activeCard: PropTypes.exact({
    card: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }),
  previousTwoCards: PropTypes.array.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
};
export default injectSheet(style)(GameCardGrid);
