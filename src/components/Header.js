import React from "react";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";

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
  menuIcon: {
    fill: "#FFF",
  },
  menuButton: {
    display: "none",
    position: "absolute",
    top: "1.75rem",
    right: "2rem",

    "@media (max-width: 60em)": {
      display: "block",
    },
  },
};
class Header extends React.Component {
  render() {
    const {classes, handleMenuOpens} = this.props;
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
        <IconButton onClick={handleMenuOpens} className={classes.menuButton}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
      </header>
    );
  }
}

Header.propTypes = {
  handleMenuOpens: PropTypes.func.isRequired,
};

export default injectSheet(style)(Header);
