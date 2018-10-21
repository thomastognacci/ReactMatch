import React from "react";
import injectSheet from "react-jss";
import SelectDifficulty from "./SelectDifficulty";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {CSSTransitionGroup} from "react-transition-group";

const style = {
  mainMenu: {
    flex: "0 0 20%",
    padding: "1rem",
    color: (props) => props.theme.colors.main,
    borderRight: "3px solid",
    borderRightColor: (props) => props.theme.colors.main,
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
      <div className={classes.mainMenu}>
        <CSSTransitionGroup
          transitionName="site-menu"
          transitionAppear={true}
          transitionAppearTimeout={1000}
        >
          <div>
            <SelectDifficulty
              difficulty={difficulty}
              handleDifficultyChange={handleDifficultyChange}
            />
            {gameStarted ? (
              <Button
                onClick={handleRestart}
                fullWidth={true}
                variant="contained"
                color="secondary"
              >
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
      </div>
    );
  }
}

export default injectSheet(style)(Menu);
