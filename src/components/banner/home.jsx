import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

import { useStyles } from "./_bannerStyles";

const Home = () => {
  const classes = useStyles();
  return (
    <Button className={`${classes.button} ${classes.homebtn}`} href="http://localhost:3000">
      <HomeRoundedIcon className={classes.btnIcons} />
      <Typography component="h3" className={classes.btnText}>
        Home
      </Typography>
    </Button>
  );
};

export default Home;
