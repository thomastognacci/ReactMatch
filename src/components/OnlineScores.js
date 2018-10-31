import React from "react";
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

	updateScores = scores => {
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
		this.setState({ isSignedIn: true, user });
	};

	signOutHandler = async () => {
		await firebase.auth().signOut();
		this.setState({ isSignedIn: false, user: null });
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
				this.updateScores(data);
			},
		});
	}

	pushBestScore = () => {
		const { bestScore } = this.props.localScores;
		const { user } = this.state;

		if (!this.state.isSignedIn || !user.uid) return;

		const entry = {
			score: bestScore.score,
			date: bestScore.secondary.toString(),
			uid: user.uid,
			photoURL: user.photoURL,
			name: user.name,
		};

		// Check if user already has a score in the DB, and if the new best score is higher than the previous one
		if (Array.isArray(this.state.fullPlayerList)) {
			if (this.state.fullPlayerList.length !== 0) {
				let key = this.state.fullPlayerList.map(dbEntry => {
					if (dbEntry.uid === user.uid) {
						if (dbEntry.score > user.score) return null;
						else return dbEntry.key;
					}

					return null;
				});
				// if that's the case, update entry
				if (key) {
					return base.update(`scores/${key}`, {
						data: entry,
						then(err) {
							if (err) return console.error("Error: ", err);
						},
					});
				}
			}
			return base.push("scores", {
				data: entry,
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
						userID={user}
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

export default injectSheet(style)(OnlineScores);
