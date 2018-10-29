import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";

import OnlineScores from "./OnlineScores";
import LocalScores from "./LocalScores";

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

  handleChange = (event, value) => {
    this.setState({value});
  };
  handleLocalScores = (localScores) => {
    const saveToLS = (state) => localStorage.setItem("memoji_scores", JSON.stringify(state));
    this.setState({localScores}, () => saveToLS(this.state));
  };

  render() {
    const {localScores} = this.state;
    const {classes, lastGameScore} = this.props;
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
          <LocalScores
            localScores={localScores}
            handleLocalScores={this.handleLocalScores}
            lastGameScore={lastGameScore}
          />
          <OnlineScores localScores={localScores} />
        </SwipeableViews>
      </React.Fragment>
    );
  }
}

Scoreboard.propTypes = {
  lastGameScore: PropTypes.number.isRequired,
};

export default injectSheet(style)(Scoreboard);
