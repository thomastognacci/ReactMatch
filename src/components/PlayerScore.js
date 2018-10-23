import React from "react";
import injectSheet from "react-jss";

const style = {
  scoreContainer: {
    flex: "1",
  },
  playerScore: {
    padding: ".5em",
  },
};
class PlayerScore extends React.Component {
  state = {
    score: 0,
  };
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.scoreContainer}>
        Score
        <div className={classes.playerScore}>{this.state.score}</div>
      </div>
    );
  }
}

export default injectSheet(style)(PlayerScore);
