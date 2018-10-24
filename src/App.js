import React, {PureComponent} from "react";
import injectSheet from "react-jss";
import {MuiThemeProvider} from "@material-ui/core/styles";

import GameEnd from "./components/GameEnd";
import MainTheme from "./components/ui/MainTheme";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Game from "./components/Game";

const style = {
  App: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  pageCT: {
    display: "flex",
    height: "100%",
  },
};
class App extends PureComponent {
  state = {
    gameStarted: false,
    gameEnded: false,
    shouldRestart: false,
    lastGameScore: 0,
    options: {
      difficulty: "easy", // TODO replace this string with a number
    },
  };
  handleScoreUpdate = (lastGameScore) => {
    this.setState({lastGameScore});
  };
  handleDifficultyChange = (e) => {
    const options = {...this.state.options};
    options.difficulty = e.target.value;
    this.setState({options});
  };
  handleEnd = () => {
    this.setState({gameEnded: true});
  };
  handleStart = () => {
    this.setState({gameStarted: true});
  };
  handleRestart = () => {
    this.setState({gameEnded: false, shouldRestart: true});
    setTimeout(() => this.setState({shouldRestart: false}));
  };
  render() {
    const {classes} = this.props;
    const {options, lastGameScore, gameStarted, shouldRestart, gameEnded} = this.state;

    return (
      <MuiThemeProvider theme={MainTheme}>
        <div className={classes.App}>
          <Header />
          <div className={classes.pageCT}>
            <Menu
              difficulty={options.difficulty}
              handleStart={this.handleStart}
              handleRestart={this.handleRestart}
              handleDifficultyChange={this.handleDifficultyChange}
              gameStarted={gameStarted}
              lastGameScore={lastGameScore}
            />
            <Game
              difficulty={options.difficulty}
              shouldRestart={shouldRestart}
              gameStarted={gameStarted}
              handleEnd={this.handleEnd}
              gameEnded={gameEnded}
              handleScoreUpdate={this.handleScoreUpdate}
            />
          </div>
        </div>
        {gameEnded && <GameEnd />}
      </MuiThemeProvider>
    );
  }
}

export default injectSheet(style)(App);
