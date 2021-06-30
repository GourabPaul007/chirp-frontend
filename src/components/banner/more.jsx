import React from "react";
import { Button, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { useStyles } from "./_buttonStyles";

const More = () => {
  const classes = useStyles();
  return (
    <Button className={`${classes.button} ${classes.morebtn}`}>
      <MoreHorizIcon className={classes.btnIcons} />
      <Typography component="h3" className={classes.btnText}>
        More
      </Typography>
    </Button>
  );
};

export default More;
