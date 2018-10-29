import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Facebook} from "mdi-material-ui";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class SignInDialog extends React.Component {
  render() {
    const {open, authenticate, handleClose, signIn} = this.props;
    return (
      <Dialog onClose={handleClose} open={open}>
        {signIn ? (
          <React.Fragment>
            <DialogTitle id="simple-dialog-title">Please select your sign-in method</DialogTitle>
            <List>
              <ListItem button onClick={authenticate}>
                <ListItemIcon>
                  <Facebook />
                </ListItemIcon>
                <ListItemText primary="Facebook" />
              </ListItem>
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogTitle id="simple-dialog-title">Signed out</DialogTitle>
            <DialogContent>
              <DialogContentText>You are no longer signed-in.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}
SignInDialog.propTypes = {
  authenticate: PropTypes.func,
  signOutHandler: PropTypes.func,
  open: PropTypes.bool.isRequired,
  signIn: PropTypes.bool,
};
export default SignInDialog;
