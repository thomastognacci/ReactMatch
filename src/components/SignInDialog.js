import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Facebook, Twitter, Google, GithubCircle } from "mdi-material-ui";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class SignInDialog extends React.PureComponent {
	handleNotImplemented() {
		alert("Not implemented yet :(");
	}
	render() {
		const { open, authenticate, handleClose } = this.props;
		return (
			<Dialog onClose={handleClose} open={open}>
				<React.Fragment>
					<DialogTitle id="simple-dialog-title">Please select your sign-in method</DialogTitle>
					<React.Fragment>
						<DialogContent>
							<DialogContentText>
								Sign-in to have your best score uploaded and see how you do compare to the rest of the world!{" "}
								<span style={{ fontSize: ".5em" }}> and cheaters</span>
							</DialogContentText>
						</DialogContent>
						<List>
							<ListItem button onClick={authenticate}>
								<ListItemIcon>
									<Facebook />
								</ListItemIcon>
								<ListItemText primary="Facebook" />
							</ListItem>
							<ListItem button onClick={this.handleNotImplemented}>
								<ListItemIcon>
									<Twitter />
								</ListItemIcon>
								<ListItemText primary="Twitter" />
							</ListItem>
							<ListItem button onClick={this.handleNotImplemented}>
								<ListItemIcon>
									<Google />
								</ListItemIcon>
								<ListItemText primary="Google" />
							</ListItem>
							<ListItem button onClick={this.handleNotImplemented}>
								<ListItemIcon>
									<GithubCircle />
								</ListItemIcon>
								<ListItemText primary="GitHub" />
							</ListItem>
						</List>
					</React.Fragment>
					<DialogActions>
						<Button color="primary" onClick={handleClose}>
							Close
						</Button>
					</DialogActions>
				</React.Fragment>
			</Dialog>
		);
	}
}
SignInDialog.propTypes = {
	authenticate: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};
export default SignInDialog;
