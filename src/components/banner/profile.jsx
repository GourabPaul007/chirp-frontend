import React from "react";
import { Button, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { useStyles } from "./_buttonStyles";

const Profile = () => {
  const classes = useStyles();
  return (
    <Button className={`${classes.button} ${classes.profilebtn}`}>
      <PersonIcon className={classes.btnIcons} />
      <Typography component="h3" className={classes.btnText}>
        Profile
      </Typography>
    </Button>
  );
};

export default Profile;
