import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import moment from "moment";

import {formatScore} from "../helpers/formatScore";

const style = {
  noLocalScore: {
    padding: "1em",
    textAlign: "center",
  },
  listItemText: {
    flex: "0",
  },
};

const stateFromLS = JSON.parse(localStorage.getItem("memoji_scores"));
class LocalScores extends React.Component {
  state = stateFromLS || {
    lastGameScore: null,
    bestScore: null,
    secondBestScore: null,
    thirdBestScore: null,
  };
  calculateScoreboard = (lastGameScore) => {
    let {bestScore, secondBestScore, thirdBestScore} = this.state;
    const saveToLS = (state) => localStorage.setItem("memoji_scores", JSON.stringify(state));
    const now = moment();
    const fromNow = now.fromNow();

    if (!lastGameScore) {
      return null;
    }
    if ((bestScore && lastGameScore >= bestScore.score) || !bestScore) {
      bestScore = {score: lastGameScore, date: fromNow};
    } else if ((secondBestScore && lastGameScore >= secondBestScore.score) || !secondBestScore) {
      secondBestScore = {score: lastGameScore, date: fromNow};
    } else if ((thirdBestScore && lastGameScore >= thirdBestScore.score) || !thirdBestScore) {
      thirdBestScore = {score: lastGameScore, date: fromNow};
    }
    this.setState({bestScore, secondBestScore, thirdBestScore}, () => saveToLS(this.state));
    return this.renderLocalScoreboard();
  };
  renderLocalScoreboard = () => {
    const {bestScore, secondBestScore, thirdBestScore} = this.state;
    const {classes} = this.props;
    const scores = [bestScore, secondBestScore, thirdBestScore];

    const listOfScore = scores
      .filter((score) => {
        return score !== null;
      })
      .map((score, index) => {
        return (
          <List key={index}>
            <ListItem dense>
              <ListItemText primary={index + 1} className={classes.listItemText} />
              <ListItemText inset primary={formatScore(score.score)} secondary={score.date} />
            </ListItem>
          </List>
        );
      });

    return <React.Fragment>{listOfScore}</React.Fragment>;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.lastGameScore !== this.props.lastGameScore) {
      this.setState({lastGameScore: this.props.lastGameScore}, () =>
        this.calculateScoreboard(this.props.lastGameScore),
      );
    }
  }
  render() {
    const {classes} = this.props;
    return this.state.bestScore ? (
      this.renderLocalScoreboard()
    ) : (
      <div className={classes.noLocalScore}>No score saved locally, yet.</div>
    );
  }
}

LocalScores.propTypes = {
  lastGameScore: PropTypes.number.isRequired,
};

export default injectSheet(style)(LocalScores);
