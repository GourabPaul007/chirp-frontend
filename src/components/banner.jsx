// Banner that will stay on every page
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Container, CssBaseline } from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PersonIcon from "@material-ui/icons/Person";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  gridItems: {
    width: 100,
    marginRight: "auto",
  },
  button: {
    textTransform: "none",
    marginTop: 12,
    marginBottom: 0,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 48,
    // border: "1px solid #777",
    borderRadius: 30,
    background: "#000",
    fontWeight: "bold",
    textAlign: "left",
    "&:hover": {
      // Set hover color
      backgroundColor: "#17bf63",
    },
  },
  tweetButton: {
    color: "#fff",
    marginTop: 24,
    marginBottom: 12,
    paddingRight: 100,
    paddingLeft: 100,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#2196F3",
    textTransform: "none",
  },
  btnText: { fontSize: 20, fontWeight: "bold" },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <div style={{ marginLeft: 200 }}>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} className={classes.gridItems}>
              <Button className={classes.button} hover>
                <HomeRoundedIcon /> &nbsp;&nbsp;
                <Typography component="h3" className={classes.btnText}>
                  Home
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.gridItems}>
              <Button className={classes.button}>
                <BookmarkBorderIcon />
                &nbsp;&nbsp;
                <Typography component="h3" className={classes.btnText}>
                  Bookmarks
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.gridItems}>
              <Button className={classes.button}>
                <FavoriteBorderIcon />
                &nbsp;&nbsp;
                <Typography component="h3" className={classes.btnText}>
                  Likes
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={12} className={classes.gridItems}>
              <Button className={classes.button}>
                <PersonIcon /> &nbsp;&nbsp;
                <Typography component="h3" className={classes.btnText}>
                  Profile
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.gridItems}>
              <Button className={classes.button}>
                <MoreHorizIcon /> &nbsp;&nbsp;
                <Typography component="h3" className={classes.btnText}>
                  More
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.tweetButton}>
                <Typography component="h3" style={{ fontWeight: "bold" }}>
                  Chirp
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Banner;
