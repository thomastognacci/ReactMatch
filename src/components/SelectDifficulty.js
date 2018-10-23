import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const style = {
  fieldset: {
    border: "1px solid #673ab7",
    padding: "1em",
  },
};
class SelectDifficulty extends React.Component {
  render() {
    const {classes, handleDifficultyChange} = this.props;
    return (
      <fieldset className={classes.fieldset}>
        <legend>Select a Difficulty</legend>
        <RadioGroup
          aria-label="Difficulty"
          name="Difficulty"
          value={this.props.difficulty}
          onChange={handleDifficultyChange}
        >
          <FormControlLabel value="easy" control={<Radio color="primary" />} label="Easy" />
          <FormControlLabel value="medium" control={<Radio color="primary" />} label="Medium" />
          <FormControlLabel value="hard" control={<Radio color="primary" />} label="Hard" />
        </RadioGroup>
      </fieldset>
    );
  }
}

SelectDifficulty.propTypes = {
  handleDifficultyChange: PropTypes.func.isRequired,
};

export default injectSheet(style)(SelectDifficulty);
