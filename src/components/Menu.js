import React from "react";
import injectSheet from "react-jss";
import SelectDifficulty from "./SelectDifficulty";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const style = {
  mainMenu: {
    flex: "0 0 20%",
    padding: "1rem",
    color: "#673ab7",
    borderRight: "3px solid",
    borderRightColor: "#673ab7",
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
    } = this.props;
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="site-menu"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        className={classes.mainMenu}
      >
        <div>
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
      </CSSTransitionGroup>
    );
  }
}

export default injectSheet(style)(Menu);
