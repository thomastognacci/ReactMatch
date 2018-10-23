import React from "react";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import GameCardGrid from "./GameCardGrid";
import GameInterface from "./GameInterface";

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
};

const initialState = {
  endGame: false,
  cardList: [],
  activeCard: {card: "", index: -1},
  previousTwoCards: [],
  revealedCount: 0,
  clickCount: 0,
  displayCards: false,
};
class Game extends React.Component {
  state = {};

  handleCardGeneration = (cardList) => {
    this.setState({cardList, displayCards: true});
  };

  handleCardClicks = (card, index) => {
    // Unpause the game if click happens before the timeout
    clearTimeout(window["timeoutIdGamePaused"]);
    this.setState({previousTwoCards: []});

    // Win
    if (card === this.state.activeCard.card && index !== this.state.activeCard.index) {
      const cardList = [...this.state.cardList];
      const revealedCount = this.state.revealedCount + 2;
      cardList[index].revealed = true;
      cardList[this.state.activeCard.index].revealed = true;
      if (revealedCount === cardList.length) {
        this.props.handleEnd();
      }
      return this.setState({
        activeCard: {card: "", index: -1},
        cardList,
        clickCount: 0,
        revealedCount,
      });
    }
    // Lost this round
    if (this.state.clickCount === 1) {
      const previousTwoCards = [this.state.activeCard.index, index];
      this.setState({
        activeCard: {card: "", index: -1},
        previousTwoCards,
        clickCount: 0,
      });
      window["timeoutIdGamePaused"] = setTimeout(() => {
        this.setState({previousTwoCards: []});
      }, 1500);
      return window["timeoutIdGamePaused"];
    }
    // One more click
    this.setState((prevState) => ({
      activeCard: {card, index},
      clickCount: prevState.clickCount + 1,
    }));
  };

  componentDidMount() {
    this.setState({
      ...initialState,
      difficulty: this.props.difficulty,
    });
  }
  componentDidUpdate(prevProps) {
    if (!this.props.gameStarted && prevProps.difficulty !== this.props.difficulty) {
      this.setState({...initialState, difficulty: this.props.difficulty});
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.shouldRestart) {
      return {...initialState, difficulty: props.difficulty};
    }
    return null;
  }
  render() {
    const {cardList, displayCards, activeCard, previousTwoCards, difficulty} = this.state;
    const {shouldRestart, classes, gameStarted, gameEnded, handleGameDuration} = this.props;
    return (
      <div className={classes.gameCT}>
        <div className={classes.game}>
          {gameStarted ? (
            <GameCardGrid
              handleCardClicks={this.handleCardClicks}
              handleCardGeneration={this.handleCardGeneration}
              previousTwoCards={previousTwoCards}
              activeCard={activeCard}
              displayCards={displayCards}
              cardList={cardList}
              difficulty={difficulty}
              shouldRestart={shouldRestart}
            />
          ) : (
            <Typography variant="overline">Pick your difficulty & Press Start</Typography>
          )}
        </div>
        <GameInterface
          gameStarted={gameStarted}
          gameEnded={gameEnded}
          shouldRestart={shouldRestart}
          handleGameDuration={handleGameDuration}
        />
      </div>
    );
  }
}

Game.propTypes = {
  shouldRestart: PropTypes.bool.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  handleGameDuration: PropTypes.func.isRequired,
};
export default injectSheet(style)(Game);
