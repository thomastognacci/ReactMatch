import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import SignInDialog from "./SignInDialog";
import {Login, Logout} from "mdi-material-ui";

const style = {
  signInOutIcons: {
    marginLeft: "0.5rem",
  },
};

class SignIn extends React.PureComponent {
  state = {
    signInOpen: false,
    signOutOpen: false,
  };

  handleClick = (signInorOut) => {
    if (signInorOut === "signIn") {
      this.setState({signInOpen: true, signOutOpen: false});
    } else {
      this.props.signOutHandler();
      this.setState({signInOpen: false, signOutOpen: true});
    }
  };
  handleClose = (value) => {
    this.setState({signInOpen: false, signOutOpen: false});
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isSignedIn === false && prevProps.isSignedIn !== this.props.isSignedIn) {
      this.setState({signInOpen: false});
    }
  }
  render() {
    const {signInOpen, signOutOpen} = this.state;
    const {classes, authenticate, isSignedIn, signOutHandler} = this.props;
    return (
      <React.Fragment>
        {isSignedIn ? (
          <Button variant="outlined" onClick={this.handleClick} size="small">
            Sign out
            <Logout className={classes.signInOutIcons} />
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => this.handleClick("signIn")} size="small">
            Sign in
            <Login className={classes.signInOutIcons} />
          </Button>
        )}
        <SignInDialog
          signIn
          handleClose={this.handleClose}
          open={signInOpen}
          authenticate={authenticate}
        />
        <SignInDialog
          handleClose={this.handleClose}
          open={signOutOpen}
          signOutHandler={signOutHandler}
        />
      </React.Fragment>
    );
  }
}
SignIn.propTypes = {
  authenticate: PropTypes.func.isRequired,
  signOutHandler: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};
export default injectSheet(style)(SignIn);
