import React from "react";
import ScoreList from "./ScoreList";

class OnlineScores extends React.Component {
  render() {
    const {children} = this.props;
    return <ScoreList online />;
  }
}

export default OnlineScores;
