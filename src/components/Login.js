import React from "react";
import Button from "@material-ui/core/Button";
import LoginDialog from "./LoginDialog";
import PropTypes from "prop-types";

class Login extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({open: true});
  };
  handleClose = (value) => {
    this.setState({open: false});
  };
  render() {
    const {open} = this.state;
    const {authenticate} = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.handleClick} fullWidth size="small">
          Sign in to submit your best score
        </Button>
        <LoginDialog handleClose={this.handleClose} open={open} authenticate={authenticate} />
      </React.Fragment>
    );
  }
}
Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};
export default Login;
