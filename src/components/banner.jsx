// Banner that will stay on every page
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, Button, Container, SvgIcon } from "@material-ui/core";

import Home from "./banner/home";
import Bookmarks from "./banner/bookmarks";
import Likes from "./banner/likes";
import Profile from "./banner/profile";
import More from "./banner/More";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 12,
    // maxWidth: 350, //because otherwise it overlaps newsfeed
  },
  gridItems: {
    marginRight: "auto",
  },
  nav: {
    [theme.breakpoints.up("md")]: { marginLeft: 200 },
    [theme.breakpoints.down("md")]: { marginLeft: 50, paddingRight: 0 },
    [theme.breakpoints.down("sm")]: { marginLeft: 8 },
  },
  tweetButton: {
    [theme.breakpoints.down("md")]: {
      paddingRight: 70,
      paddingLeft: 70,
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      height: 40,
    },
    minWidth: 40,
    color: "#fff",
    marginTop: 24,
    marginBottom: 12,
    paddingRight: 80,
    paddingLeft: 80,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#0288D1",
    textTransform: "none",
  },
  tweetButtonIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  tweetButtonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    fontSize: 20,
    fontWeight: "bold",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        {/* To position the menu in desired place */}
        <div className={classes.nav}>
          <Grid
            container
            spacing={1}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} className={classes.gridItems}>
              <Home />
            </Grid>
            <Grid item xs={12} className={classes.gridItems}>
              <Bookmarks />
            </Grid>
            <Grid item xs={12} className={classes.gridItems}>
              <Likes />
            </Grid>
            <Grid item xs={12} className={classes.gridItems}>
              <Profile />
            </Grid>

            <Grid item xs={12} className={classes.gridItems}>
              <More />
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.tweetButton}>
                <SvgIcon viewBox="0 0 16 16" className={classes.tweetButtonIcon}>
                  <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                </SvgIcon>
                <Typography component="h3" className={classes.tweetButtonText}>
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
