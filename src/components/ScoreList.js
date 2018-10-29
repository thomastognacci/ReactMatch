import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group/";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";

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
  progress: {
    margin: "2rem",
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
          .map((score, index) => {
            const isOnline = this.props.online;
            if (!isOnline) {
              var date = moment(score.secondary);
              var dateFromNow = date.fromNow();
            }

            return (
              <CSSTransition
                in
                appear={Boolean(this.props.bestScore)}
                key={index}
                timeout={500}
                classNames={"local-score"}
              >
                <List>
                  <ListItem dense>
                    {isOnline ? (
                      <Avatar
                        alt="Pup"
                        src="https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V_400x400.jpeg"
                      />
                    ) : (
                      <ListItemText primary={index + 1} className={classes.listItemText} />
                    )}
                    <ListItemText
                      inset
                      primary={formatScore(score.score)}
                      secondary={isOnline ? `#${index + 1} | ${score.name}` : dateFromNow}
                    />
                  </ListItem>
                </List>
              </CSSTransition>
            );
          })}
      </TransitionGroup>
    );
  };
  render() {
    const {classes, online, bestScore} = this.props;
    return bestScore ? (
      this.renderScoreboard()
    ) : (
      <div className={classes.noScore}>
        {online ? (
          <CircularProgress className={classes.progress} />
        ) : (
          "No score saved locally, yet."
        )}
      </div>
    );
  }
}

ScoreList.propTypes = {
  bestScore: PropTypes.object,
  secondBestScore: PropTypes.object,
  thirdBestScore: PropTypes.object,
};

export default injectSheet(style)(ScoreList);
