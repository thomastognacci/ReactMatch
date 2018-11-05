import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class PersonalDataDialog extends React.PureComponent {
  state = {};
  render() {
    const {
      dataDialogOpen,
      handleDeleteData,
      handleDataDialogClose,
      isSignedIn,
      dataDeletedStatus,
    } = this.props;
    return (
      <Dialog onClose={handleDataDialogClose} open={dataDialogOpen}>
        <DialogTitle>Delete your personal data</DialogTitle>
        {isSignedIn && !dataDeletedStatus ? (
          <div>
            <DialogContent>
              <DialogContentText>
                This will delete your personal information.
                <br />
                <br />
                Your name, profile picture and user ID will be deleted from the database. Your score
                will be kept anonymous.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDataDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteData} color="primary">
                Delete my data
              </Button>
            </DialogActions>
          </div>
        ) : dataDeletedStatus ? (
          <>
            <DialogContent>{dataDeletedStatus}</DialogContent>
            <DialogActions>
              <Button onClick={handleDataDialogClose}>Cancel</Button>
            </DialogActions>
          </>
        ) : (
          <DialogContent>
            <DialogContentText>Please sign-in.</DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    );
  }
}

PersonalDataDialog.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  dataDialogOpen: PropTypes.bool.isRequired,
  handleDataDialogClose: PropTypes.func.isRequired,
  handleDeleteData: PropTypes.func.isRequired,
  dataDeletedStatus: PropTypes.string,
};
export default PersonalDataDialog;
