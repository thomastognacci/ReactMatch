import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import SignInDialog from "./SignInDialog";
import { Login, Logout } from "mdi-material-ui";

const style = {
	signInOutIcons: {
		marginLeft: "0.5rem",
	},
	snackbar: {
		position: "fixed",
		right: "0",
	},
};

class SignIn extends React.PureComponent {
	state = {
		signInDialogOpen: false,
	};

	handleClick = signInorOut => {
		if (signInorOut === "signIn") {
			this.setState({ signInDialogOpen: true });
		} else {
			this.props.signOutHandler();
		}
	};
	handleClose = () => {
		this.setState({ signInDialogOpen: false });
	};

	componentDidUpdate(prevProps) {
		if (this.props.isSignedIn && prevProps.isSignedIn !== this.props.isSignedIn) {
			this.handleClose();
		}
	}
	render() {
		const { signInDialogOpen } = this.state;
		const { classes, authenticate, isSignedIn } = this.props;
		return (
			<React.Fragment>
				{isSignedIn ? (
					<Button variant="outlined" color="primary" onClick={this.handleClick} size="small">
						Sign out
						<Logout className={classes.signInOutIcons} />
					</Button>
				) : (
					<Button variant="outlined" color="primary" onClick={() => this.handleClick("signIn")} size="small">
						Sign in
						<Login className={classes.signInOutIcons} />
					</Button>
				)}
				<SignInDialog handleClose={this.handleClose} open={signInDialogOpen} authenticate={authenticate} />
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
