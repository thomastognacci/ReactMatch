import React from "react";
import injectSheet from "react-jss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import cx from "classnames";

const style = {
  card: {
    backgroundColor: (props) => {
      return props.revealed ? "#4CAF50" : "#6b62c6";
    },
    opacity: (props) => (props.revealed ? ".5" : "1"),
    transition: "all .5s",
    height: "100%",
    color: "white",
    textAlign: "center",
    "& span": {
      fontSize: (props) => `${props.difficulty === "hard" ? "2.5" : "4"}em`,
    },
  },
  cardActive: {
    backgroundColor: "#ffc500 !important",
    "& span": {
      filter: "drop-shadow(0px 0px 10px white)",
    },
  },
  wrongChoice: {
    backgroundColor: "#f44336 !important",
    "& span": {
      filter: "drop-shadow(0px 0px 10px white)",
    },
  },
  cardActionArea: {
    height: "100%",
  },
  cardContent: {
    padding: "0",
    display: "inline-block",
  },
};

class GameCard extends React.Component {
  handleClick = () => {
    const {isActive, revealed} = this.props;
    if (isActive || revealed) return;
    this.props.handleCardClicks(this.props.content, this.props.index);
  };
  render() {
    const {classes, content, isActive, previouslyActive, revealed, paused} = this.props;
    const cardClasses = cx(
      classes.card,
      isActive && classes.cardActive,
      previouslyActive && classes.wrongChoice,
      paused && classes.gamePaused,
    );

    return (
      <Card
        raised={!this.props.revealed && true}
        onClick={this.handleClick}
        className={cardClasses}
      >
        <CardActionArea className={classes.cardActionArea}>
          <CardContent className={classes.cardContent}>
            <span aria-label="emoji" role="img">
              {revealed || isActive || previouslyActive ? content : "?"}
              {/* {content} */}
            </span>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default injectSheet(style)(GameCard);
