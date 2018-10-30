import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const style = {
	fieldset: {
		border: "1px solid #673ab7",
		padding: "1em"
	},
	formGroup: {
		display: "block"
	}
};
class SelectDifficulty extends React.PureComponent {
	render() {
		const { classes, handleDifficultyChange, difficulty } = this.props;
		const difficultyValue = difficulty.toString();
		return (
			<fieldset className={classes.fieldset}>
				<legend>Select a Difficulty</legend>
				<RadioGroup
					aria-label="Difficulty"
					name="Difficulty"
					className={classes.formGroup}
					value={difficultyValue}
					onChange={handleDifficultyChange}
				>
					<FormControlLabel
						value="0"
						control={<Radio color="primary" />}
						label="Easy"
					/>
					<FormControlLabel
						value="1"
						control={<Radio color="primary" />}
						label="Med."
					/>
					<FormControlLabel
						value="2"
						control={<Radio color="primary" />}
						label="Hard"
					/>
				</RadioGroup>
			</fieldset>
		);
	}
}

SelectDifficulty.propTypes = {
	handleDifficultyChange: PropTypes.func.isRequired,
	difficulty: PropTypes.number.isRequired
};

export default injectSheet(style)(SelectDifficulty);
