import React from "react";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";

const style = {
  myHeader: {
    padding: "2rem",
    color: "white",
    background: "linear-gradient(to top left, #6e7bca, #673ab7)",
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
        <Typography variant="h1" gutterBottom={false}>
          <span aria-label="brain-emoji" role="img">
            🧠
          </span>{" "}
          Memoji{" "}
          <span aria-label="brain-emoji" role="img">
            🧠
          </span>
        </Typography>
      </header>
    );
  }
}

export default injectSheet(style)(Header);
