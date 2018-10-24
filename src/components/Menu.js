import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Scoreboard from "./Scoreboard";
import MenuLinks from "./MenuLinks";
import SelectDifficulty from "./SelectDifficulty";

const style = {
  mainMenu: {
    flexShrink: "0",
    color: "#673ab7",
    borderRight: "3px solid",
    borderRightColor: "#673ab7",
    display: "flex",
    flexDirection: "column",
  },
  topMenu: {
    padding: "1rem",
  },
};
class Menu extends React.Component {
  render() {
    const {
      classes,
      handleDifficultyChange,
      difficulty,
      handleRestart,
      handleStart,
      gameStarted,
      lastGameScore,
    } = this.props;
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="site-menu"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
        className={classes.mainMenu}
      >
        <div className={classes.topMenu}>
          <SelectDifficulty
            difficulty={difficulty}
            handleDifficultyChange={handleDifficultyChange}
          />
          <ExpansionPanel elevation={0}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              More Options
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <span aria-label="poop emoji" role="img">
                  💩
                </span>
                Nothing here for now!
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {gameStarted ? (
            <Button onClick={handleRestart} fullWidth={true} variant="contained" color="secondary">
              <Typography variant="button">Restart</Typography> &nbsp;-&nbsp;
              <Typography variant="caption">{difficulty}</Typography>
            </Button>
          ) : (
            <Button onClick={handleStart} fullWidth={true} variant="contained" color="primary">
              Start!
            </Button>
          )}
        </div>
        <Scoreboard lastGameScore={lastGameScore} />
        <MenuLinks />
      </CSSTransitionGroup>
    );
  }
}

Menu.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  handleDifficultyChange: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  lastGameScore: PropTypes.number.isRequired,
};
export default injectSheet(style)(Menu);
