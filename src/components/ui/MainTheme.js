import {createMuiTheme} from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import amber from "@material-ui/core/colors/amber";

const MainTheme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: amber,
  },
  typography: {
    // fontSize: 12,
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      root: {
        marginTop: "1em",
      },
    },
  },
});

export default MainTheme;
