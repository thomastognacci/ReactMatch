import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { formatScore } from "../helpers/formatScore";

const style = {
	user: {
		background: "#ffc10733",
	},
};

class FullPlayerListDialog extends React.PureComponent {
	renderScoreboard = () => {
		const players = this.props.fullPlayerList;
		const { user, classes } = this.props;

		if (!Array.isArray(players)) return null;

		return players
			.filter(player => {
				return Boolean(player);
			})
			.map((player, index) => {
				let secondaryText = `#${index + 1} | `;

				if (user) {
					if (player.uid === user.uid) secondaryText += `You! (${player.name})`;
					else {
						secondaryText += player.name;
					}
				} else {
					secondaryText += player.name;
				}
				return (
					<List key={player.key}>
						<ListItem className={user && player.uid === user.uid ? classes.user : null} dense>
							<Avatar alt={player.name} src={player.photoURL} />
							<ListItemText inset primary={formatScore(player.score)} secondary={secondaryText} />
						</ListItem>
					</List>
				);
			});
	};
	render() {
		const { open, handleClose } = this.props;
		return (
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle id="simple-dialog-title">Scoreboard</DialogTitle>
				<DialogContent>
					<DialogContentText>Here is the list of all the heroes that have defeated the game.</DialogContentText>

					{this.renderScoreboard()}
					<DialogActions>
						<Button onClick={handleClose}>I have seen enough!</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		);
	}
}

FullPlayerListDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	fullPlayerList: PropTypes.array.isRequired,
};
export default injectSheet(style)(FullPlayerListDialog);
