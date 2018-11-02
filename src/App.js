import React, {PureComponent} from "react";
import injectSheet from "react-jss";
import {MuiThemeProvider} from "@material-ui/core/styles";

import GameEnd from "./components/GameEnd";
import MainTheme from "./components/ui/MainTheme";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Game from "./components/Game";
import SignInSnackbars from "./components/SignInSnackbars";

const style = {
  App: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",

    "@media (max-width: 60em)": {
      position: "fixed",
      left: 0,
      right: 0,
    },
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
    isSignedIn: {status: false, message: ""},
    openSnackbar: false,
    difficulty: 0,
  };
  handleIsSignedIn = (bool, error = false) => {
    const {isSignedIn} = this.state;
    if (bool) {
      isSignedIn.status = true;
      isSignedIn.message = "You are signed-in. Your best score will automatically be uploaded.";
    } else if (!bool && !error) {
      isSignedIn.status = false;
      isSignedIn.message = "You are signed-out.";
    } else if (error && error.message) {
      isSignedIn.status = false;
      isSignedIn.message = error.message;
    }

    this.setState({isSignedIn, openSnackbar: true}, () => this.setState({openSnackbar: false}));
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
    this.setState({difficulty: parseInt(e.target.value)});
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
    const {
      menuOpen,
      difficulty,
      lastGameScore,
      gameStarted,
      shouldRestart,
      gameEnded,
      isSignedIn,
      openSnackbar,
    } = this.state;

    return (
      <MuiThemeProvider theme={MainTheme}>
        <div className={classes.App}>
          <Header menuOpen={menuOpen} handleMenuOpens={this.handleMenuOpens} />
          <div className={classes.pageCT}>
            <Menu
              menuOpen={menuOpen}
              difficulty={difficulty}
              handleStart={this.handleStart}
              handleRestart={this.handleRestart}
              handleDifficultyChange={this.handleDifficultyChange}
              gameStarted={gameStarted}
              lastGameScore={lastGameScore}
              handleMenuOpens={this.handleMenuOpens}
              handleIsSignedIn={this.handleIsSignedIn}
            />
            <Game
              handleRestart={this.handleRestart}
              difficulty={difficulty}
              shouldRestart={shouldRestart}
              gameStarted={gameStarted}
              handleEnd={this.handleEnd}
              gameEnded={gameEnded}
              handleScoreUpdate={this.handleScoreUpdate}
            />
            <SignInSnackbars openSnackbar={openSnackbar} isSignedIn={isSignedIn} />
          </div>
        </div>
        {gameEnded && <GameEnd />}
      </MuiThemeProvider>
    );
  }
}

export default injectSheet(style)(App);
