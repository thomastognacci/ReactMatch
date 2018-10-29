import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import OnlineScores from "./OnlineScores";
import LocalScores from "./LocalScores";

const style = {
  scoreboard: {
    marginTop: "auto",
  },
};

class Scoreboard extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes, lastGameScore} = this.props;
    // const {lastGameScore} = this.state;
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
          <LocalScores lastGameScore={lastGameScore} />
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
