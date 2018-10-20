import React from "react";
import injectSheet from "react-jss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

const style = {
  cardContent: {
    fontSize: "5em",
    textAlign: "center",
  },
};

class GameCard extends React.Component {
  render() {
    const {classes, content} = this.props;
    return (
      <Card>
        <CardActionArea>
          <CardContent className={classes.cardContent} content={content}>
            <span aria-label="emoji" role="img">
              {content}
            </span>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default injectSheet(style)(GameCard);
