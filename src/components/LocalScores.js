import React from "react";
import ScoreList from "./ScoreList";
import moment from "moment";

const stateFromLS = JSON.parse(localStorage.getItem("memoji_scores"));

class LocalScores extends React.Component {
  state = stateFromLS || {
    lastGameScore: null,
    localScores: {
      bestScore: null,
      secondBestScore: null,
      thirdBestScore: null,
    },
  };

  updateLocalScores = () => {
    let {lastGameScore} = this.state;
    let {bestScore, secondBestScore, thirdBestScore} = this.state.localScores;
    const saveToLS = (state) => localStorage.setItem("memoji_scores", JSON.stringify(state));
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
    return this.setState({localScores}, () => saveToLS(this.state));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.lastGameScore !== this.props.lastGameScore) {
      this.setState({lastGameScore: this.props.lastGameScore}, () =>
        this.updateLocalScores(this.props.lastGameScore),
      );
    }
  }

  render() {
    const {localScores} = this.state;
    return <ScoreList {...localScores} />;
  }
}

export default LocalScores;
