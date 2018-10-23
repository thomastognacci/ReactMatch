import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import Timer from "./Timer";
import PlayerScore from "./PlayerScore";

const style = {
  gameUI: {
    display: "flex",
    marginTop: "auto",
    color: "#FFFFFF",
    padding: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: "1.25em",
    background: "linear-gradient(to top right, #6e7bca, #673ab7)",
  },
};
class GameInterface extends React.Component {
  render() {
    const {
      classes,
      handleGameDuration,
      gameEnded,
      gameStarted,
      shouldRestart,
      pairRevealedCount,
      totalClickCount,
      difficulty,
    } = this.props;
    return (
      <div className={classes.gameUI}>
        <Timer
          handleGameDuration={handleGameDuration}
          gameEnded={gameEnded}
          gameStarted={gameStarted}
          shouldRestart={shouldRestart}
        />
        <PlayerScore
          pairRevealedCount={pairRevealedCount}
          totalClickCount={totalClickCount}
          difficulty={difficulty}
        />
      </div>
    );
  }
}

GameInterface.propTypes = {
  handleGameDuration: PropTypes.func.isRequired,
  gameEnded: PropTypes.bool.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
  pairRevealedCount: PropTypes.number.isRequired,
  totalClickCount: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default injectSheet(style)(GameInterface);
