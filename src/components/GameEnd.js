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
    pointerEvents: "none",
  },
};
class GameEnd extends React.Component {
  render() {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
      numberOfPieces: 250,
    };
    const {classes} = this.props;
    return (
      <div className={classes.confettiContainer}>
        <Confetti {...size} />
      </div>
    );
  }
}

export default injectSheet(style)(GameEnd);
