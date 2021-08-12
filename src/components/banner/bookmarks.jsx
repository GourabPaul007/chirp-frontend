import React from "react";
import { Button, Typography } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import { useStyles } from "./_bannerStyles";

const Bookmarks = () => {
  const classes = useStyles();
  return (
    <Button
      className={`${classes.button} ${classes.bookmarksbtn}`}
      href={`http://localhost:3000/paul/bookmarks`}
    >
      <BookmarkBorderIcon className={classes.btnIcons} />
      <Typography component="h3" className={classes.btnText}>
        Bookmarks
      </Typography>
    </Button>
  );
};

export default Bookmarks;
