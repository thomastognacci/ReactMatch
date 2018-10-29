import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Facebook} from "mdi-material-ui";
import PropTypes from "prop-types";

class LoginDialog extends React.Component {
  render() {
    const {open, authenticate, handleClose} = this.props;
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="simple-dialog-title">Log in</DialogTitle>
        <List>
          <ListItem button onClick={authenticate}>
            <ListItemIcon>
              <Facebook />
            </ListItemIcon>
            <ListItemText primary="Facebook" />
          </ListItem>
        </List>
      </Dialog>
    );
  }
}
LoginDialog.propTypes = {
  authenticate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default LoginDialog;
