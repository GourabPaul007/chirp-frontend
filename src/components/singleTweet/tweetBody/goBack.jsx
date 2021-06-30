import React from "react";

import { makeStyles, CardContent, IconButton, Typography } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

const useStyles = makeStyles({
  goBack: {
    display: "flex",
    paddingBottom: 4,
    paddingTop: 4,
    margin: 0,
    marginBottom: 16,
    background: "#000000",
    border: "1px solid #777",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
  },
});

const handleBack = () => {
  window.history.back();
};

const GoBack = () => {
  const classes = useStyles();

  return (
    <CardContent className={classes.goBack}>
      <IconButton style={{ marginLeft: 0 }} onClick={handleBack}>
        <ArrowBackRoundedIcon />
      </IconButton>
      <Typography style={{ marginLeft: 8, paddingTop: 8, fontSize: 20 }}>Back</Typography>
    </CardContent>
  );
};

export default GoBack;
