import React from "react";
import injectSheet from "react-jss";
import firebase from "firebase/app";
import "firebase/auth";

import ScoreList from "./ScoreList";
import base from "../base";
import SignIn from "./SignIn";
import {firebaseApp} from "../base";
import Button from "@material-ui/core/Button";
import {ViewList} from "mdi-material-ui";

import FullScoreListDialog from "./FullScoreListDialog";

const style = {
  fullList: {
    marginRight: "1rem",
  },
  fullListIcon: {
    marginLeft: ".5rem",
  },
  onlineScoreActions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "1rem",
  },
};
class OnlineScores extends React.PureComponent {
  state = {
    scores: null,
    onlineScores: {
      bestScore: null,
      secondBestScore: null,
      thirdBestScore: null,
    },
    fullScoreListOpen: false,
    fullScoreList: {},
    user: null,
    isSignedIn: false,
  };

  updateScores = (scores) => {
    let scoreOrdered = scores.slice();
    scoreOrdered.sort((a, b) => {
      return b.score - a.score;
    });
    let bestScore = scoreOrdered[0];
    let secondBestScore = scoreOrdered[1];
    let thirdBestScore = scoreOrdered[2];

    const onlineScores = {bestScore, secondBestScore, thirdBestScore};
    return this.setState({onlineScores, fullScoreList: scoreOrdered});
  };

  handleClick = () => {
    this.setState({fullScoreListOpen: true});
  };
  handleClose = () => {
    this.setState({fullScoreListOpen: false});
  };

  authHandler = async (data) => {
    const user = {uid: data.user.uid, photoURL: data.user.photoURL, name: data.user.displayName};
    this.setState({isSignedIn: true, user});
  };

  signOutHandler = async () => {
    await firebase.auth().signOut();
    this.setState({isSignedIn: false, user: null});
  };

  authenticate = () => {
    const authProvider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.authHandler({user});
    });
    base.fetch("scores", {
      context: this,
      then(data) {
        this.updateScores(data);
      },
    });
    // this.ref = base.syncState("scores", {
    //   context: this,
    //   state: "scores",
    // });
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref);
  }

  render() {
    const {classes} = this.props;
    const {onlineScores, isSignedIn, fullScoreList, fullScoreListOpen} = this.state;
    return (
      <React.Fragment>
        <ScoreList online {...onlineScores} />
        <div className={classes.onlineScoreActions}>
          {/* // TODO Move to its own component */}
          <Button
            color="primary"
            className={classes.fullList}
            size="small"
            onClick={this.handleClick}
          >
            View Full List
            <ViewList className={classes.fullListIcon} />
          </Button>
          <FullScoreListDialog
            handleClose={this.handleClose}
            open={fullScoreListOpen}
            fullScoreList={fullScoreList}
          />
          {/* // TODO /end Move to its own component */}

          <SignIn
            signOutHandler={this.signOutHandler}
            isSignedIn={isSignedIn}
            authenticate={this.authenticate}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default injectSheet(style)(OnlineScores);
