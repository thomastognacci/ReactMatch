import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Button from "@material-ui/core/Button";
import {ViewList} from "mdi-material-ui";

import FullPlayerListDialog from "./FullPlayerListDialog";

const style = {
  fullList: {
    marginRight: "1rem",
  },
  fullListIcon: {
    marginLeft: ".5rem",
  },
};
class FullPlayerList extends React.PureComponent {
  state = {
    fullPlayerListOpen: false,
  };

  handleClick = () => {
    this.setState({fullPlayerListOpen: true});
  };

  handleClose = () => {
    this.setState({fullPlayerListOpen: false});
  };
  render() {
    const {classes, fetchError, user, fullPlayerList} = this.props;
    const {fullPlayerListOpen} = this.state;
    return (
      <>
        <Button
          color="primary"
          className={classes.fullList}
          size="small"
          onClick={this.handleClick}
          disabled={fetchError}
        >
          View Full List
          <ViewList className={classes.fullListIcon} />
        </Button>
        <FullPlayerListDialog
          user={user}
          handleClose={this.handleClose}
          open={fullPlayerListOpen}
          fullPlayerList={fullPlayerList}
        />
      </>
    );
  }
}
FullPlayerList.propTypes = {
  fetchError: PropTypes.bool.isRequired,
  fullPlayerList: PropTypes.array.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    photoURL: PropTypes.string,
    uid: PropTypes.string,
  }),
};

export default injectSheet(style)(FullPlayerList);
