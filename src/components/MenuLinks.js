import React from "react";
import injectSheet from "react-jss";
import IconButton from "@material-ui/core/IconButton";
import {GithubCircle} from "mdi-material-ui";

const style = {
  menuLinks: {},
};
class MenuLinks extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.menuLinks}>
        <IconButton
          target="_blank"
          href="https://github.com/thomastognacci/memoji"
          color="primary"
          aria-label="GitHub page"
        >
          <GithubCircle />
        </IconButton>
      </div>
    );
  }
}

export default injectSheet(style)(MenuLinks);
