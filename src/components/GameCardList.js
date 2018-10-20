import React from "react";
import GameCard from "./GameCard";
import injectSheet from "react-jss";

const style = {
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    gridTemplateRows: "auto",
    gridGap: "1em",
  },
};

class GameCardList extends React.Component {
  generateCards = () => {
    // this will generate the array of cards based on difficulty
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.gameGrid}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    );
  }
}

export default injectSheet(style)(GameCardList);
