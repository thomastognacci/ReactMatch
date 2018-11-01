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
    position: "relative",
    display: "flex",
    height: "100vh",
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
    menuOpen: true,
    headerHeight: 0,
    options: {
      difficulty: 0,
    },
  };
  handleScoreUpdate = (lastGameScore) => {
    this.setState({lastGameScore});
  };
  handleMenuOpens = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  };
  handleDifficultyChange = (e) => {
    const options = {...this.state.options};

    options.difficulty = parseInt(e.target.value);
    this.setState({options});
  };
  handleEnd = () => {
    this.setState({gameEnded: true});
  };
  handleStart = () => {
    this.setState({gameStarted: true, menuOpen: false});
  };
  handleRestart = () => {
    this.setState({gameEnded: false, shouldRestart: true, menuOpen: false});
    setTimeout(() => this.setState({shouldRestart: false}));
  };
  render() {
    const {classes} = this.props;
    const {menuOpen, options, lastGameScore, gameStarted, shouldRestart, gameEnded} = this.state;

    return (
      <MuiThemeProvider theme={MainTheme}>
        <div className={classes.App}>
          <Header menuOpen={menuOpen} handleMenuOpens={this.handleMenuOpens} />
          <div className={classes.pageCT}>
            <Menu
              menuOpen={menuOpen}
              difficulty={options.difficulty}
              handleStart={this.handleStart}
              handleRestart={this.handleRestart}
              handleDifficultyChange={this.handleDifficultyChange}
              gameStarted={gameStarted}
              lastGameScore={lastGameScore}
              handleMenuOpens={this.handleMenuOpens}
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
