import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

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
  updateScore() {
    const oldScore = this.state.score;

    let difficultyMultiplier = 1;
    if (this.props.difficulty === "medium") {
      difficultyMultiplier = 3;
    } else if (this.props.difficulty === "hard") {
      difficultyMultiplier = 8;
    }

    // Less than 60 seconds gives you a speed bonus ( e.g. x6 is you beat the game in 10s )
    let speedMultiplier = 1 + (6 - this.props.gameDuration / 10000);
    let speedBonus = speedMultiplier > 1 ? speedMultiplier : 1;

    const pointsScored =
      speedBonus * difficultyMultiplier * this.props.pairRevealedCount * 2250 -
      this.props.totalClickCount * 750;
    const score = pointsScored < 0 ? oldScore : oldScore + pointsScored;
    this.setState({score});
  }
  formatScore(score) {
    let scoreString = score.toString();
    if (scoreString.length < 4) return score;
    if (scoreString.length < 7) {
      return `${scoreString.slice(0, -3)}.${scoreString.slice(-3)}`;
    }
    if (scoreString.length < 10) {
      return `${scoreString.slice(-9, -6)}.${scoreString.slice(-6, -3)}.${scoreString.slice(-3)}`;
    }
    return "cheater!";
  }
  static getDerivedStateFromProps(props, state) {
    if (props.shouldRestart) {
      return {score: 0};
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.pairRevealedCount !== this.props.pairRevealedCount) {
      this.updateScore();
    }
  }
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.scoreContainer}>
        Score
        <div className={classes.playerScore}>{this.formatScore(this.state.score)}</div>
      </div>
    );
  }
}

PlayerScore.propTypes = {
  pairRevealedCount: PropTypes.number.isRequired,
  totalClickCount: PropTypes.number.isRequired,
  gameDuration: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  shouldRestart: PropTypes.bool.isRequired,
};
export default injectSheet(style)(PlayerScore);
