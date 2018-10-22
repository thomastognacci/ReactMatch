import React from "react";
import injectSheet from "react-jss";
import Timer from "./Timer";

const style = {
	gameUI: {
		padding: "2em"
	}
};
class GameInterface extends React.Component {
	render() {
		const {
			classes,
			handleGameDuration,
			gameEnded,
			gameStarted,
			shouldRestart
		} = this.props;
		return (
			<div className={classes.gameUI}>
				<Timer
					handleGameDuration={handleGameDuration}
					gameEnded={gameEnded}
					gameStarted={gameStarted}
					shouldRestart={shouldRestart}
				/>
			</div>
		);
	}
}

export default injectSheet(style)(GameInterface);
