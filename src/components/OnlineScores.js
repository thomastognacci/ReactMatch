import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import firebase from "firebase/app";
import "firebase/auth";

import ScoreList from "./ScoreList";
import base from "../base";
import SignIn from "./SignIn";
import { firebaseApp } from "../base";
import Button from "@material-ui/core/Button";
import { ViewList } from "mdi-material-ui";

import FullPlayerListDialog from "./FullPlayerListDialog";

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
		fullPlayerListOpen: false,
		fullPlayerList: [],
		fetchError: false,
		user: null,
		isSignedIn: false,
	};

	updateOnlineScores = scores => {
		// If no score or error connecting to the DB
		if (!Array.isArray(scores)) return this.setState({ fetchError: true });

		// Order the scores and grab the 3 best
		let scoreOrdered = scores.slice();
		scoreOrdered.sort((a, b) => {
			return b.score - a.score;
		});
		let bestScore = scoreOrdered[0];
		let secondBestScore = scoreOrdered[1];
		let thirdBestScore = scoreOrdered[2];

		const onlineScores = { bestScore, secondBestScore, thirdBestScore };
		return this.setState({ onlineScores, fullPlayerList: scoreOrdered });
	};

	handleClick = () => {
		this.setState({ fullPlayerListOpen: true });
	};

	handleClose = () => {
		this.setState({ fullPlayerListOpen: false });
	};

	authHandler = async data => {
		const user = {
			uid: data.user.uid,
			photoURL: data.user.photoURL,
			name: data.user.displayName,
		};

		// if there is a best score already, push it online
		this.pushBestScore();

		this.setState({ isSignedIn: true, user }, this.props.handleIsSignedIn(true));
	};

	signOutHandler = async () => {
		await firebase.auth().signOut();
		this.setState({ isSignedIn: false, user: null });
		this.props.handleIsSignedIn(false);
	};

	authenticate = () => {
		const authProvider = new firebase.auth.FacebookAuthProvider();
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler);
	};

	fetchDBEntries() {
		base.fetch("scores", {
			context: this,
			asArray: true,
			then(data) {
				this.updateOnlineScores(data);
			},
		});
	}

	pushBestScore = () => {
		const { bestScore } = this.props.localScores;
		const { fullPlayerList } = this.state;
		if (!bestScore) return;

		const { user } = this.state;

		if (!this.state.isSignedIn || !user.uid) return;

		const newEntry = {
			score: bestScore.score,
			date: bestScore.secondary.toString(),
			uid: user.uid,
			photoURL: user.photoURL,
			name: user.name,
		};

		if (Array.isArray(fullPlayerList)) {
			// Check if user already has a score in the DB, and if the new best score is higher than the previous one
			if (fullPlayerList.length !== 0) {
				var dbEntry = fullPlayerList.find(function(player) {
					return player.uid === user.uid;
				});

				if (dbEntry) {
					// skip the entry is user already in DB but the score is lower than the previous one
					if (dbEntry.score > newEntry.score) {
						return;
					} else {
						return base.update(`scores/${dbEntry.key}`, {
							data: newEntry,
							then(err) {
								if (err) return console.error("Error: ", err);
							},
						});
					}
				}
			}
			// otherwise, create new entry
			return base.push("scores", {
				data: newEntry,
				then(err) {
					if (err) return console.error("Error: ", err);
				},
			});
		}
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) this.authHandler({ user });
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
		const { classes } = this.props;
		const { onlineScores, isSignedIn, fullPlayerList, fullPlayerListOpen, fetchError, user } = this.state;
		return (
			<React.Fragment>
				<ScoreList fetchError={fetchError} online {...onlineScores} />
				<div className={classes.onlineScoreActions}>
					{/* // TODO Move to its own component */}
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
					{/* // TODO /end Move to its own component */}

					<SignIn signOutHandler={this.signOutHandler} isSignedIn={isSignedIn} authenticate={this.authenticate} />
				</div>
			</React.Fragment>
		);
	}
}

OnlineScores.propTypes = {
	handleLocalScores: PropTypes.func.isRequired,
	localScores: PropTypes.shape({
		bestScore: PropTypes.object,
		secondBestScore: PropTypes.object,
		thirdBestScore: PropTypes.object,
	}),
};

export default injectSheet(style)(OnlineScores);
