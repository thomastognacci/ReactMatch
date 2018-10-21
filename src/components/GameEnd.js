import React from "react";
import Confetti from "react-confetti";

class GameEnd extends React.Component {
  render() {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight,
      numberOfPieces: 350,
    };
    return (
      <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
        <Confetti {...size} />
      </div>
    );
  }
}

export default GameEnd;
