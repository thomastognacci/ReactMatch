import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group/";

import {formatScore} from "../helpers/formatScore";

const style = {
  noScore: {
    padding: "1em",
    textAlign: "center",
  },
  listItemText: {
    flex: "0",
  },
  ScoresGroup: {
    overflow: "hidden",
  },
};

class ScoreList extends React.Component {
  renderScoreboard = () => {
    const {classes} = this.props;
    const {bestScore, secondBestScore, thirdBestScore} = this.props;
    const scores = [bestScore, secondBestScore, thirdBestScore];
    return (
      <TransitionGroup component="div" className={classes.ScoresGroup}>
        {scores
          .filter((score) => {
            return Boolean(score);
          })
          .map((score, index) => (
            // TODO figure out a way to animate new scores that replace old ones
            <CSSTransition
              in
              appear={Boolean(this.props.bestScore)}
              key={index}
              timeout={500}
              classNames={"local-score"}
            >
              <List>
                <ListItem dense>
                  <ListItemText primary={index + 1} className={classes.listItemText} />
                  <ListItemText inset primary={formatScore(score.score)} secondary={score.date} />
                </ListItem>
              </List>
            </CSSTransition>
          ))}
      </TransitionGroup>
    );
  };
  render() {
    const {classes, online, bestScore} = this.props;
    return bestScore ? (
      this.renderScoreboard()
    ) : (
      <div className={classes.noScore}>
        No {online ? "online scores" : "score saved locally"}, yet.
      </div>
    );
  }
}

ScoreList.propTypes = {
  bestScore: PropTypes.number,
};

export default injectSheet(style)(ScoreList);
