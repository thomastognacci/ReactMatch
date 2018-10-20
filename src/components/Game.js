import React from "react";
import injectSheet from "react-jss";
import GameCardGrid from "./GameCardGrid";
const style = {
  gameCT: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  game: {
    padding: "2em",
    flex: "1",
  },
  gameUI: {
    padding: "2em",
  },
};
class Game extends React.Component {
  render() {
    const {classes, difficulty, gameStarted} = this.props;
    return (
      <div className={classes.gameCT}>
        <div className={classes.game}>
          {gameStarted && <GameCardGrid difficulty={difficulty} />}
        </div>
        <div className={classes.gameUI}>
          <div>
            <strong>Game UI</strong>
          </div>
          <span>Score: XXXX</span> <span>(PROGRESS MUI)Card Revealed: XX / XX</span>
        </div>
      </div>
    );
  }
}

export default injectSheet(style)(Game);
