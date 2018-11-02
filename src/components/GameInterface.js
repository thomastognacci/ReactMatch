import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Timer from "./Timer";
import PlayerScore from "./PlayerScore";

const style = {
  gameUIButton: {
    margin: "1rem 0",
    width: "30rem",
    maxWidth: "calc(100% - 2rem)",
    left: "50%",
    transform: "translateX(-50%)",
    "@media (min-width: 60em)": {
      display: "none",
    },
  },
  gameUIBottom: {
    position: "relative",
    display: "flex",
    color: "#FFFFFF",
    padding: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: "1.25em",
    background: "linear-gradient(to top left, #6e7bca, #673ab7)",
  },
  gameUI: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",

    "@media (max-width: 60em)": {
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0,
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
      handleRestart,
      pairRevealedCount,
      totalClickCount,
      difficulty,
      handleScoreUpdate,
    } = this.props;

    let difficultyString = "Easy";
    if (difficulty === 1) difficultyString = "Medium";
    if (difficulty === 2) difficultyString = "Hard";

    return (
      <div className={classes.gameUI}>
        <div className={classes.gameUITop}>
          {gameStarted ? (
            <Button
              onClick={handleRestart}
              className={classes.gameUIButton}
              fullWidth={true}
              variant="contained"
              color="secondary"
            >
              <Typography variant="button">Restart</Typography> &nbsp;-&nbsp;
              <Typography variant="caption">{difficultyString}</Typography>
            </Button>
          ) : null}
        </div>
        <div className={classes.gameUIBottom}>
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
      </div>
    );
  }
}

GameInterface.propTypes = {
  handleGameDuration: PropTypes.func.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  gameDuration: PropTypes.number.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
  handleRestart: PropTypes.func.isRequired,
  pairRevealedCount: PropTypes.number.isRequired,
  cardListCount: PropTypes.number.isRequired,
  totalClickCount: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default injectSheet(style)(GameInterface);
