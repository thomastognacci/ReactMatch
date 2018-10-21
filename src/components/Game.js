import React from "react";
import injectSheet from "react-jss";
import GameCardGrid from "./GameCardGrid";
const style = {
  gameCT: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  game: {
    padding: "2em",
    flex: "1",
  },
  gameUI: {
    padding: "2em",
  },
};

const initialState = {
  paused: false,
  endGame: false,
  cardList: null,
  activeCard: {},
  previousTwoCards: [],
  revealedCount: 0,
  clickCount: 0,
};
class Game extends React.Component {
  state = initialState;

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
  static getDerivedStateFromProps(props, state) {
    if (props.shouldRestart) {
      return initialState;
    }
    return null;
  }
  render() {
    const {cardList, displayCards, activeCard, previousTwoCards, paused, endGame} = this.state;
    const {shouldRestart, classes, difficulty, gameStarted} = this.props;
    return (
      <div className={classes.gameCT}>
        <div className={classes.game}>
          {gameStarted && (
            <GameCardGrid
              handleCardClicks={this.handleCardClicks}
              handleCardGeneration={this.handleCardGeneration}
              paused={paused}
              previousTwoCards={previousTwoCards}
              activeCard={activeCard}
              displayCards={displayCards}
              cardList={cardList}
              difficulty={difficulty}
              endGame={endGame}
              shouldRestart={shouldRestart}
            />
          )}
        </div>
        <div className={classes.gameUI}>
          <div>
            <strong>Game UI</strong>
          </div>
          <span>Score: XXXX</span> <span>(PROGRESS MUI)Card Revealed: XX / XX</span>
        </div>
      </div>
    );
  }
}

export default injectSheet(style)(Game);
