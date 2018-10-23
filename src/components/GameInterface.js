import React from "react";
import injectSheet from "react-jss";
import Timer from "./Timer";
import PropTypes from "prop-types";

const style = {
  gameUI: {},
};
class GameInterface extends React.Component {
  render() {
    const {classes, handleGameDuration, gameEnded, gameStarted, shouldRestart} = this.props;
    return (
      <div className={classes.gameUI}>
        <Timer
          handleGameDuration={handleGameDuration}
          gameEnded={gameEnded}
          gameStarted={gameStarted}
          shouldRestart={shouldRestart}
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
};

export default injectSheet(style)(GameInterface);
