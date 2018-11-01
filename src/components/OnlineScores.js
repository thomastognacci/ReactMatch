import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import firebase from "firebase/app";
import "firebase/auth";

import ScoreList from "./ScoreList";
import base from "../base";
import SignIn from "./SignIn";
import {firebaseApp} from "../base";

import FullPlayerList from "./FullPlayerList";

const style = {
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
    fullPlayerList: [],
    fetchError: false,
    user: null,
    isSignedIn: false,
  };

  updateOnlineScores = (scores) => {
    // If no score or error connecting to the DB
    if (!Array.isArray(scores)) return this.setState({fetchError: true});

    // Order the scores and grab the 3 best
    let scoreOrdered = scores.slice();
    scoreOrdered.sort((a, b) => {
      return b.score - a.score;
    });
    let bestScore = scoreOrdered[0];
    let secondBestScore = scoreOrdered[1];
    let thirdBestScore = scoreOrdered[2];

    const onlineScores = {bestScore, secondBestScore, thirdBestScore};
    return this.setState({onlineScores, fullPlayerList: scoreOrdered});
  };

  authHandler = async (data) => {
    const user = {
      uid: data.user.uid,
      photoURL: data.user.photoURL,
      name: data.user.displayName,
    };

    // if there is a best score already, push it online
    this.pushBestScore();

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

  fetchDBEntries() {
    base.fetch("players", {
      context: this,
      asArray: true,
      then(data) {
        this.updateOnlineScores(data);
      },
    });
  }

  pushBestScore = () => {
    const {bestScore} = this.props.localScores;
    const {fullPlayerList} = this.state;
    if (!bestScore) return;

    const {user} = this.state;

    if (!this.state.isSignedIn || !user.uid) return;

    const newEntry = {
      score: bestScore.score,
      date: bestScore.secondary.toString(),
      uid: user.uid,
      photoURL: user.photoURL,
      name: user.name,
    };

    console.debug("New best score", newEntry.score);
    // Make sure we have the full list of player as an Array
    if (Array.isArray(fullPlayerList)) {
      // Check if user already has a score in the DB, and if the new best score is higher than the previous one
      if (fullPlayerList.length !== 0) {
        var dbEntry = fullPlayerList.find(function(player) {
          return player.uid === user.uid;
        });

        if (dbEntry) {
          console.debug("Player already exist!");
          // skip the entry is user already in DB but the score is lower than the previous one
          if (dbEntry.score > newEntry.score) {
            console.debug("Score is lower than the one in the DB, return");
            return;
          } else {
            console.debug("Updated the score for that player");
            return base.update(`players/${dbEntry.key}`, {
              data: newEntry,
              then(err) {
                if (err) return console.error("Error: ", err);
              },
            });
          }
        }
      }
      // otherwise, create new entry
      console.debug("New player entered");
      return base.push("players", {
        data: newEntry,
        then(err) {
          if (err) return console.error("Error: ", err);
        },
      });
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) this.authHandler({user});
    });
    this.fetchDBEntries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.localScores.bestScore !== this.props.localScores.bestScore) {
      this.fetchDBEntries();
      this.pushBestScore();
    }
  }

  render() {
    const {classes, handleIsSignedIn} = this.props;
    const {onlineScores, isSignedIn, fullPlayerList, fetchError, user} = this.state;
    return (
      <React.Fragment>
        <ScoreList fetchError={fetchError} online {...onlineScores} />
        <div className={classes.onlineScoreActions}>
          <FullPlayerList user={user} fullPlayerList={fullPlayerList} fetchError={fetchError} />
          <SignIn
            handleIsSignedIn={handleIsSignedIn}
            signOutHandler={this.signOutHandler}
            isSignedIn={isSignedIn}
            authenticate={this.authenticate}
          />
        </div>
      </React.Fragment>
    );
  }
}

OnlineScores.propTypes = {
  handleLocalScores: PropTypes.func.isRequired,
  handleIsSignedIn: PropTypes.func.isRequired,
  localScores: PropTypes.shape({
    bestScore: PropTypes.object,
    secondBestScore: PropTypes.object,
    thirdBestScore: PropTypes.object,
  }),
};

export default injectSheet(style)(OnlineScores);
