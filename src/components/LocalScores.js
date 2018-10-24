import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const style = {
  listItemText: {
    flex: "0",
  },
};
class LocalScores extends React.Component {
  state = {
    lastGameScore: 0,
    bestScore: 0,
    secondBestScore: 0,
    thirdBestScore: 0,
  };
  calculateScoreboard = (lastGameScore) => {
    const bestScore = this.state.bestScore;
    const secondBestScore = this.state.bestScore;
    const thirdBestScore = this.state.bestScore;

    if (lastGameScore < thirdBestScore) return;

    if (lastGameScore > bestScore) {
      this.setState({
        bestScore: lastGameScore,
        secondBestScore: bestScore,
        thirdBestScore: secondBestScore,
      });
      return; // TODO
    }
    if (lastGameScore > secondBestScore) {
      this.setState({
        secondBestScore: lastGameScore,
        thirdBestScore: secondBestScore,
      });
      return; // TODO
    }
    if (lastGameScore > thirdBestScore) {
      this.setState({
        thirdBestScore: lastGameScore,
      });
      return; // TODO
    }
  };
  renderLocalScoreboard = () => {
    const {classes} = this.props;
    return (
      <List>
        <ListItem dense>
          <ListItemText primary="   " className={classes.listItemText} />
          <ListItemText inset primary="" secondary="" />
        </ListItem>
      </List>
    );
  };
  componentDidUpdate() {
    if (this.props.lastGameScore !== this.state.lastGameScore) {
      this.setState({lastGameScore: this.props.lastGameScore});
      this.calculateScoreboard(this.props.lastGameScore);
    }
  }
  render() {
    return this.renderLocalScoreboard();
  }
}

LocalScores.propTypes = {
  lastGameScore: PropTypes.number.isRequired,
};

export default injectSheet(style)(LocalScores);
