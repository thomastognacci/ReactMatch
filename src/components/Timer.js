import React from "react";
import injectSheet from "react-jss";

const style = {
  timer: {
    marginTop: "auto",
    color: "#FFFFFF",
    padding: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: "1.25em",
    background: "linear-gradient(to top right, #6e7bca, #673ab7)",
  },
};

class Timer extends React.Component {
  state = {
    running: false,
    time: 0,
  };
  handleTimer = (command) => {
    if (command === "restart") {
      clearInterval(this.timer);
    }
    const startTime = Date.now();
    this.timer = setInterval(() => {
      this.setState({running: true, time: Date.now() - startTime});
    }, 100);
  };

  formatTime = (time) => {
    let ms = Math.floor((time / 100) % 10);
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor(time / 60000);
    return `${min > 9 ? "" : "0"}${min} : ${sec > 9 ? "" : "0"}${sec} : ${ms}`;
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.gameStarted) {
      this.handleTimer();
    }
    if (prevProps.shouldRestart) {
      this.handleTimer("restart");
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.gameEnded) {
      clearInterval(this.timer);
      this.props.handleGameDuration(this.state.time);
      return false;
    }
    return true;
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {classes} = this.props;
    const {time} = this.state;

    return <div className={classes.timer}>{this.formatTime(time)}</div>;
  }
}

export default injectSheet(style)(Timer);
