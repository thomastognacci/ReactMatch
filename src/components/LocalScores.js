import React from "react";
import ScoreList from "./ScoreList";
import moment from "moment";
import PropTypes from "prop-types";

class LocalScores extends React.PureComponent {
  updateLocalScores = () => {
    let {lastGameScore} = this.props;
    let {bestScore, secondBestScore, thirdBestScore} = this.props.localScores;
    const now = moment();

    if (!lastGameScore) {
      return null;
    }
    if ((bestScore && lastGameScore >= bestScore.score) || !bestScore) {
      thirdBestScore = secondBestScore;
      secondBestScore = bestScore;
      bestScore = {score: lastGameScore, secondary: now};
    } else if ((secondBestScore && lastGameScore >= secondBestScore.score) || !secondBestScore) {
      thirdBestScore = secondBestScore;
      secondBestScore = {score: lastGameScore, secondary: now};
    } else if ((thirdBestScore && lastGameScore >= thirdBestScore.score) || !thirdBestScore) {
      thirdBestScore = {score: lastGameScore, secondary: now};
    }
    const localScores = {bestScore, secondBestScore, thirdBestScore};
    return this.props.handleLocalScores(localScores);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.lastGameScore !== this.props.lastGameScore) {
      this.updateLocalScores();
    }
  }

  render() {
    const {localScores} = this.props;
    return <ScoreList {...localScores} />;
  }
}

LocalScores.propTypes = {
  localScores: PropTypes.object.isRequired,
};

export default LocalScores;
