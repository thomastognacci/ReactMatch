import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { formatScore } from "../helpers/formatScore";

const style = {
	scoreContainer: {
		flex: "1"
	},
	playerScore: {
		padding: ".5em"
	}
};
class PlayerScore extends React.PureComponent {
	state = {
		score: 0
	};
	updateScore() {
		const oldScore = this.state.score;

		let difficultyMultiplier = Math.ceil(Math.exp(this.props.difficulty));

		// Less than 60 seconds gives you a speed bonus ( e.g. x6 is you beat the game in 10s )
		let speedMultiplier = 1 + (6 - this.props.gameDuration / 10000);

		let speedBonus = speedMultiplier > 1 ? speedMultiplier : 1;

		const pointsScored = Math.floor(
			speedBonus * difficultyMultiplier * this.props.pairRevealedCount * 500 -
				this.props.totalClickCount * 500
		);

		const score = pointsScored < 0 ? oldScore : oldScore + pointsScored;
		this.setState({ score });
	}

	static getDerivedStateFromProps(props, state) {
		if (props.shouldRestart) {
			return { score: 0 };
		}
		return null;
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevState.score < this.state.score) {
			return this.state.score;
		}
		return null;
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.pairRevealedCount !== this.props.pairRevealedCount) {
			this.updateScore();
		}
		//! There is too many update here --- Review lifecycles - snapshot could probably be removed!
		if ((prevState.shouldRestart || this.props.gameEnded) && snapshot) {
			this.props.handleScoreUpdate(snapshot);
		}
	}
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.scoreContainer}>
				Score
				<div className={classes.playerScore}>
					{formatScore(this.state.score)}
				</div>
			</div>
		);
	}
}

PlayerScore.propTypes = {
	pairRevealedCount: PropTypes.number.isRequired,
	totalClickCount: PropTypes.number.isRequired,
	gameDuration: PropTypes.number.isRequired,
	difficulty: PropTypes.number.isRequired,
	shouldRestart: PropTypes.bool.isRequired,
	gameEnded: PropTypes.bool.isRequired,
	handleScoreUpdate: PropTypes.func.isRequired
};
export default injectSheet(style)(PlayerScore);
