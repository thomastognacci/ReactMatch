import React from "react";
import Confetti from "react-confetti";
import injectSheet from "react-jss";

const style = {
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    maxHeight: "100vh",
    pointerEvents: "none",
  },
  confetti: {
    maxHeight: "100%",
  },
};
class GameEnd extends React.PureComponent {
  state = {
    soundIsPlaying: false,
  };

  handlePlay = () => {
    setTimeout(() => {
      this.setState({soundIsPlaying: true});
    }, 500);
  };

  render() {
    const {soundIsPlaying} = this.state;
    const options = {
      width: window.innerWidth,
      height: window.innerHeight,
      numberOfPieces: 100,
      gravity: 0.25,
      run: soundIsPlaying,
    };
    const {classes} = this.props;
    return (
      <div className={classes.confettiContainer}>
        <Confetti recycle={false} className={classes.confetti} {...options} />
        <audio onPlay={this.handlePlay()} autoPlay>
          <source src="./sounds/yay.mp3" type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

export default injectSheet(style)(GameEnd);
