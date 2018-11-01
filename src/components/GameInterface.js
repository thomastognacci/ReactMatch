import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Timer from "./Timer";
import PlayerScore from "./PlayerScore";

const style = {
  gameUI: {
    position: "relative",
    display: "flex",
    marginTop: "auto",
    color: "#FFFFFF",
    padding: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: "1.25em",
    background: "linear-gradient(to top left, #6e7bca, #673ab7)",

    "@media (max-width: 60em)": {
      bottom: 0,
      position: "fixed",
      width: "100%",
    },
  },
  progress: {
    position: "absolute",
    top: "-5px",
    left: "0",
    width: "100%",
  },
};
class GameInterface extends React.PureComponent {
  state = {
    completed: 0,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.shouldRestart !== this.props.shouldRestart) {
      this.setState({completed: 0});
    }
    if (prevProps.pairRevealedCount !== this.props.pairRevealedCount) {
      const completed = 100 * (this.props.pairRevealedCount / this.props.cardListCount);
      this.setState({completed});
    }
  }
  render() {
    const {
      classes,
      handleGameDuration,
      gameEnded,
      gameStarted,
      gameDuration,
      shouldRestart,
      pairRevealedCount,
      totalClickCount,
      difficulty,
      handleScoreUpdate,
    } = this.props;
    return (
      <React.Fragment>
        <div className={classes.gameUI}>
          <LinearProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
          />
          <Timer
            handleGameDuration={handleGameDuration}
            gameEnded={gameEnded}
            gameStarted={gameStarted}
            shouldRestart={shouldRestart}
          />
          <PlayerScore
            gameEnded={gameEnded}
            handleScoreUpdate={handleScoreUpdate}
            pairRevealedCount={pairRevealedCount}
            totalClickCount={totalClickCount}
            difficulty={difficulty}
            gameDuration={gameDuration}
            shouldRestart={shouldRestart}
          />
        </div>
      </React.Fragment>
    );
  }
}

GameInterface.propTypes = {
  handleGameDuration: PropTypes.func.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  gameDuration: PropTypes.number.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
  pairRevealedCount: PropTypes.number.isRequired,
  cardListCount: PropTypes.number.isRequired,
  totalClickCount: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default injectSheet(style)(GameInterface);
