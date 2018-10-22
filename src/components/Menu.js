import React from "react";
import injectSheet from "react-jss";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import SelectDifficulty from "./SelectDifficulty";
import Timer from "./Timer";

const style = {
  mainMenu: {
    flex: "0 0 20%",

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
      shouldRestart,
      gameEnded,
      handleGameDuration,
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
        <Timer
          handleGameDuration={handleGameDuration}
          gameEnded={gameEnded}
          gameStarted={gameStarted}
          shouldRestart={shouldRestart}
        />
      </CSSTransitionGroup>
    );
  }
}

export default injectSheet(style)(Menu);
