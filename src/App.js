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
    gameStarted: true,
    options: {
      difficulty: "easy",
    },
  };
  handleDifficultyChange = (e) => {
    const options = {...this.state.options};
    options.difficulty = e.target.value;
    this.setState({options});
  };
  handleClickStart = (e) => {
    this.setState({gameStarted: true});
  };
  render() {
    const {classes} = this.props;
    const {options, gameStarted} = this.state;
    return (
      <MuiThemeProvider theme={MainTheme}>
        <div className={classes.App}>
          <Header {...style} />
          <div className={classes.pageCT}>
            <Menu
              {...options}
              {...style}
              handleClickStart={this.handleClickStart}
              handleDifficultyChange={this.handleDifficultyChange}
              gameStarted={gameStarted}
            />
            <Game {...options} {...style} gameStarted={gameStarted} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default injectSheet(style)(App);
