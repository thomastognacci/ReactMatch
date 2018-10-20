import React from "react";
import injectSheet from "react-jss";
import SelectDifficulty from "./SelectDifficulty";
import Button from "@material-ui/core/Button";

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
    const {classes, handleDifficultyChange, difficulty} = this.props;
    return (
      <div className={classes.mainMenu}>
        <SelectDifficulty difficulty={difficulty} handleDifficultyChange={handleDifficultyChange} />
        <Button fullWidth={true} variant="contained" color="primary">
          Start!
        </Button>
        <Button fullWidth={true} variant="contained" color="secondary">
          Restart
        </Button>
      </div>
    );
  }
}

export default injectSheet(style)(Menu);
