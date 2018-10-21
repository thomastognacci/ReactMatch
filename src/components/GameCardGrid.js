import React from "react";
import injectSheet from "react-jss";
import cx from "classnames";
import CardGenerator from "./CardGenerator";
import GameEnd from "./GameEnd";

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
      handleCardGeneration,
      handleCardClicks,
      classes,
      cardList,
      displayCards,
      difficulty,
      activeCard,
      previousTwoCards,
      paused,
      endGame,
      shouldRestart,
    } = this.props;
    const gridClasses = cx(classes.gameGrid, this.state.difficulty === "easy" && classes.easyGrid);
    return (
      <div className={gridClasses}>
        {endGame && <GameEnd />}
        <CardGenerator
          difficulty={difficulty}
          shouldRestart={shouldRestart}
          paused={paused}
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

export default injectSheet(style)(GameCardGrid);
