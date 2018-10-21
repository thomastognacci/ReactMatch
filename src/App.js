import React, {PureComponent} from "react";
import injectSheet from "react-jss";
import {MuiThemeProvider} from "@material-ui/core/styles";

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
  theme: {
    colors: {
      main: "#673ab7",
    },
    gradient: {
      main: "linear-gradient(to top left, #6e7bca, #673ab7)",
    },
  },
};
class App extends PureComponent {
  state = {
    gameStarted: false,
    options: {
      difficulty: "easy",
    },
  };
  handleDifficultyChange = (e) => {
    const options = {...this.state.options};
    options.difficulty = e.target.value;
    this.setState({options});
  };
  handleStart = (e) => {
    this.setState({gameStarted: true});
  };
  handleRestart = (e) => {
    this.setState({shouldRestart: true});
    setTimeout(() => this.setState({shouldRestart: false}));
  };
  render() {
    const {classes} = this.props;
    const {options, gameStarted, shouldRestart} = this.state;
    return (
      <MuiThemeProvider theme={MainTheme}>
        <div className={classes.App}>
          <Header {...style} />
          <div className={classes.pageCT}>
            <Menu
              {...options}
              {...style}
              handleStart={this.handleStart}
              handleRestart={this.handleRestart}
              handleDifficultyChange={this.handleDifficultyChange}
              gameStarted={gameStarted}
            />
            <Game {...options} {...style} shouldRestart={shouldRestart} gameStarted={gameStarted} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default injectSheet(style)(App);
