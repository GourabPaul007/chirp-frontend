import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 0,
      paddingRight: 0,
    },
    minWidth: 40,
    textTransform: "none",
    marginTop: 12,
    marginBottom: 0,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 30,
    background: "#000",
    fontWeight: "bold",
    textAlign: "left",
  },
  homebtn: {
    "&:hover": {
      backgroundColor: "#E64A19",
    },
  },
  bookmarksbtn: {
    "&:hover": {
      backgroundColor: "#17bf63",
    },
  },
  likesbtn: {
    "&:hover": {
      backgroundColor: "#e0245e",
    },
  },
  profilebtn: {
    "&:hover": {
      backgroundColor: "#9C27B0",
    },
  },
  morebtn: {
    "&:hover": {
      backgroundColor: "#FFA333",
    },
  },
  btnIcons: {
    padding: 0,
    margin: 0,
  },
  btnText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  moreMenuItems: {
    paddingLeft: 16,
    paddingRight: 8,
  },
}));
