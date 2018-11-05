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
    isSignedIn: false,
    signInMessage: "",
    showSnackbar: false,
    difficulty: 0,
  };
  handleIsSignedIn = (bool, error = false) => {
    let {isSignedIn, signInMessage} = this.state;
    if (bool) {
      isSignedIn = true;
      signInMessage = "You are signed-in. Your best score will automatically be uploaded.";
    } else if (!bool && !error) {
      isSignedIn = false;
      signInMessage = "You are signed-out.";
    } else if (error && error.message) {
      isSignedIn = false;
      signInMessage = error.message;
    }

    this.setState({isSignedIn, signInMessage});
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
      signInMessage,
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
              isSignedIn={isSignedIn}
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
            <SignInSnackbars signInMessage={signInMessage} isSignedIn={isSignedIn} />
          </div>
        </div>
        {gameEnded && <GameEnd />}
      </MuiThemeProvider>
    );
  }
}

export default injectSheet(style)(App);
