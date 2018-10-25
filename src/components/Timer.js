import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const style = {
  timerContainer: {
    flex: "1",
  },
  timer: {
    padding: ".5em",
  },
};

class Timer extends React.Component {
  state = {
    time: 0,
  };
  handleTimer = (command) => {
    if (command === "restart") {
      clearInterval(this.timer);
    }
    const startTime = Date.now();
    this.timer = setInterval(() => {
      this.setState({time: Date.now() - startTime});
    }, 100);
  };

  formatTime = (time) => {
    let ms = Math.floor((time / 100) % 10);
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor(time / 60000);
    return `${min > 9 ? "" : "0"}${min} : ${sec > 9 ? "" : "0"}${sec} : ${ms}0`;
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.gameEnded) {
      clearInterval(this.timer);
      return false;
    }
    this.props.handleGameDuration(this.state.time);
    return true;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.gameStarted && this.props.gameStarted) {
      this.handleTimer();
    }
    if (prevProps.shouldRestart) {
      this.handleTimer("restart");
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {classes} = this.props;
    const {time} = this.state;

    return (
      <div className={classes.timerContainer}>
        Time
        <div className={classes.timer}>{this.formatTime(time)}</div>
      </div>
    );
  }
}

Timer.propTypes = {
  handleGameDuration: PropTypes.func.isRequired,
};

export default injectSheet(style)(Timer);
