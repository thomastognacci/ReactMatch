import React from "react";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import {CSSTransitionGroup} from "react-transition-group";

const style = {
  myHeader: {
    padding: "2rem",
    color: "white",
    background: (props) => props.theme.gradient.main,
    textAlign: "center",

    "& h1": {
      margin: 0,
      color: "white",
      fontSize: "2.5em",
    },
  },
};
class Header extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <header className={classes.myHeader}>
        <CSSTransitionGroup
          transitionName="site-title"
          transitionAppear={true}
          transitionAppearTimeout={1250}
        >
          <Typography variant="h1" gutterBottom={false}>
            {" < "}
            <span aria-label="brain-emoji" role="img">
              🧠
            </span>
            {" - "}
            Memoji
            {" - "}
            <span aria-label="brain-emoji" role="img">
              🧠
            </span>
            {" > "}
          </Typography>
        </CSSTransitionGroup>
      </header>
    );
  }
}

export default injectSheet(style)(Header);
