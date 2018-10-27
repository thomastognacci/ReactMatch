import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import OnlineScores from "./OnlineScores";
import ScoreList from "./ScoreList";
import moment from "moment";

const style = {
  scoreboard: {
    marginTop: "auto",
  },
};

const stateFromLS = JSON.parse(localStorage.getItem("memoji_scores"));
class Scoreboard extends React.Component {
  state = stateFromLS || {
    value: 0,
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
    const fromNow = now.fromNow();

    if (!lastGameScore) {
      return null;
    }
    if ((bestScore && lastGameScore >= bestScore.score) || !bestScore) {
      thirdBestScore = secondBestScore;
      secondBestScore = bestScore;
      bestScore = {score: lastGameScore, date: fromNow};
    } else if ((secondBestScore && lastGameScore >= secondBestScore.score) || !secondBestScore) {
      thirdBestScore = secondBestScore;
      secondBestScore = {score: lastGameScore, date: fromNow};
    } else if ((thirdBestScore && lastGameScore >= thirdBestScore.score) || !thirdBestScore) {
      thirdBestScore = {score: lastGameScore, date: fromNow};
    }
    const localScores = {bestScore, secondBestScore, thirdBestScore};
    return this.setState({localScores}, () => saveToLS(this.state));
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  componentDidUpdate(prevProps) {
    if (prevProps.lastGameScore !== this.props.lastGameScore) {
      this.setState({lastGameScore: this.props.lastGameScore}, () =>
        this.updateLocalScores(this.props.lastGameScore),
      );
    }
  }

  render() {
    const {classes, lastGameScore} = this.props;
    const {localScores} = this.state;
    return (
      <React.Fragment>
        <Typography className={classes.scoreboard} variant="overline" align="center">
          Scoreboard
        </Typography>
        <Divider light />
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Local" />
          <Tab label="Online" />
        </Tabs>
        <SwipeableViews axis={"x"} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          <ScoreList {...localScores} />
          <OnlineScores />
        </SwipeableViews>
      </React.Fragment>
    );
  }
}

Scoreboard.propTypes = {
  lastGameScore: PropTypes.number.isRequired,
};

export default injectSheet(style)(Scoreboard);
