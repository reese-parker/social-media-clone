const styles = {
    mobileDrawerPaperProps: {
      width: "175px",
    },
    desktopDrawer: {
      display: "none",
      "@media (min-width: 900px)": {
        display: "contents",
      },
    },
    desktopDrawerPaperProps: { width: "175px", paddingTop: "75px" },
  };

  export default styles