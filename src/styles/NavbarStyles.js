import theme from "./theme";

const styles = {
  AppBar: {
    position: "sticky",
    "@media(min-width: 900px)": {
      zIndex: "1201",
    },
  },
  headerToolbar: {
    background: theme.palette.primary.dark,
    height: "16px",
  },
  ToolbarContainer: {
    justifyContent: "space-between",
    
  },
  Title: {
    color: "#ffffff",
    // marginLeft: "10%",
    fontWeight: 700,
    fontSize: ".9rem",
    "@media (min-width: 321px)": {
      fontSize: "1rem",
    },
    "@media (min-width: 600px)": {
      fontSize: "1.5rem",
    },
    "@media (min-width: 900px)": {
      fontSize: "1.8rem",
    },
  },
  MenuIcon: {
    color: "#ffffff",
    "@media (min-width: 900px)": {
      display: "none"
    }
  },
  signInLink: {
    textDecoration: "none",
  },
  signInButton: {
    color: "#ffffff",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  displayName: {
    fontSize: "0.75rem",
    "@media (min-width: 900px)": {
      fontSize: "1rem",
    },
  },

};

export default styles;
