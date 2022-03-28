import theme from "./theme.js";

const styles = {
  container: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  userInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  displayName: {
    fontSize: "0.8rem",
    marginLeft: ".2rem",
  },
  ListItem: {
    marginBottom: "1.5rem",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
};

export default styles