import React from "react";
import { Button, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useStyles } from "./_bannerStyles";

const Likes = () => {
  const classes = useStyles();
  return (
    <Button
      className={`${classes.button} ${classes.likesbtn}`}
      href={`http://localhost:3000/paul/likes`}
    >
      <FavoriteBorderIcon className={classes.btnIcons} />
      <Typography component="h3" className={classes.btnText}>
        Likes
      </Typography>
    </Button>
  );
};

export default Likes;
