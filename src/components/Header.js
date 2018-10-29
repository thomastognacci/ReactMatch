import React from "react";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
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
  menuButton: {
    margin: "0",
    display: "none",
    position: "absolute",
    top: "1.75rem",
    right: "2rem",
    cursor: "pointer",

    "@media (max-width: 60em)": {
      display: "inline-flex",
    },
  },
  menuIcon: {
    marginLeft: "0.5rem",
  },
};
class Header extends React.Component {
  render() {
    const {classes, handleMenuOpens, menuOpen} = this.props;
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
        <Button
          variant="contained"
          color="secondary"
          onClick={handleMenuOpens}
          className={classes.menuButton}
        >
          Menu
          {menuOpen ? (
            <CloseIcon className={classes.menuIcon} />
          ) : (
            <MenuIcon className={classes.menuIcon} />
          )}
        </Button>
      </header>
    );
  }
}

Header.propTypes = {
  handleMenuOpens: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

export default injectSheet(style)(Header);
