import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import {formatScore} from "../helpers/formatScore";

class FullScoreListDialog extends React.Component {
  renderScoreboard = () => {
    const scores = this.props.fullScoreList;

    if (!Array.isArray(scores)) return null;

    return scores
      .filter((score) => {
        return Boolean(score);
      })
      .map((score, index) => {
        // if (!isOnline) {
        //   var date = moment(score.secondary);
        //   var dateFromNow = date.fromNow();
        // }
        return (
          <List key={score.score}>
            <ListItem dense>
              <Avatar
                alt="Pup"
                src="https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V_400x400.jpeg"
              />
              <ListItemText
                inset
                primary={formatScore(score.score)}
                secondary={`#${index + 1} | ${score.name}`}
              />
            </ListItem>
          </List>
        );
      });
  };
  render() {
    const {open, handleClose} = this.props;
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="simple-dialog-title">Scoreboard</DialogTitle>
        <DialogContent>
          {this.renderScoreboard()}
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

FullScoreListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default FullScoreListDialog;
