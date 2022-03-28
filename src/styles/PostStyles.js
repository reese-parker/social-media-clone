import theme from "./theme";

const styles = {
    Paper: {
      width: "100%",
      maxWidth: "530px",
    },
    GridContainer: {
      minHeight: "120px",
    },
    userIconContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    displayName: {
      fontWeight: 700,
      color: theme.palette.grey[800],
      fontSize: ".8rem",
    },
    postText: {
      lineHeight: 1.25,
      paddingRight: "6px"
    },
    postInfoContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    postDate: {
      fontSize: "0.8rem",
      fontWeight: 700,
      color: theme.palette.grey[700],
    },
  };

  export default styles