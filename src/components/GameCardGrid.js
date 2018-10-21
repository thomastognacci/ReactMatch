import React from "react";
import injectSheet from "react-jss";
import CardGenetor from "./CardGenerator";
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
  state = {
    paused: false,
    endGame: false,
    cardList: null,
    activeCard: {},
    previousTwoCards: [],
    revealedCount: 0,
    clickCount: 0,
  };

  handleCardGeneration = (cardList) => {
    this.setState({cardList, displayCards: true});
  };

  handleCardClicks = (card, index) => {
    // Unpause the game if click happens before the timeout
    clearTimeout(window["timeoutIdGamePaused"]);
    this.setState({paused: false, previousTwoCards: []});

    // Win
    if (card === this.state.activeCard.card && index !== this.state.activeCard.index) {
      const cardList = [...this.state.cardList];
      const revealedCount = this.state.revealedCount + 2;
      cardList[index].revealed = true;
      cardList[this.state.activeCard.index].revealed = true;
      if (revealedCount === cardList.length) {
        return this.setState({
          activeCard: {},
          cardList,
          clickCount: 0,
          revealedCount,
          endGame: true,
        });
      }
      return this.setState({activeCard: {}, cardList, clickCount: 0, revealedCount});
    }
    // Lost this round
    if (this.state.clickCount === 1) {
      const previousTwoCards = [this.state.activeCard.index, index];
      this.setState({activeCard: {}, previousTwoCards, clickCount: 0, paused: true});
      window["timeoutIdGamePaused"] = setTimeout(() => {
        this.setState({previousTwoCards: [], paused: false});
      }, 1500);
      return window["timeoutIdGamePaused"];
    }
    // One more click
    this.setState((prevState) => ({
      activeCard: {card, index},
      clickCount: prevState.clickCount + 1,
    }));
  };

  render() {
    const {classes} = this.props;
    const {cardList, displayCards, activeCard, previousTwoCards, paused, endGame} = this.state;

    return (
      <div className={classes.gameGrid}>
        {endGame && <GameEnd />}
        <CardGenetor
          paused={paused}
          handleCardClicks={this.handleCardClicks}
          handleCardGeneration={this.handleCardGeneration}
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
