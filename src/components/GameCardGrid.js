import React from "react";
import injectSheet from "react-jss";
import CardGenerator from "./CardGenerator";
import GameEnd from "./GameEnd";

const style = {
  gameGrid: {
    display: "grid",
    maxWidth: "32em",
    margin: "auto",
    gridTemplateColumns: "repeat(auto-fit, 6.5em)",
    gridAutoRows: "6.5em",
    justifyContent: "center",
    gridGap: "1em",
  },
};

class GameCardGrid extends React.Component {
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

    return (
      <div className={classes.gameGrid}>
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
