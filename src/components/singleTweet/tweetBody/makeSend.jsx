import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

import {
  IconButton,
  Dialog,
  DialogContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Avatar,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";

import SendRoundedIcon from "@material-ui/icons/SendRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import SaveAltRoundedIcon from "@material-ui/icons/SaveAltRounded";

const useStyles = makeStyles({
  ListItems: {
    width: 300,
    fontSize: 20,
    // padding: 8,
    // margin: 8,
  },
});

const MakeSend = () => {
  const classes = useStyles();

  // For Snackbar open/close stuff
  const [sbOpen, setSBOpen] = useState(false);
  const handleSBClose = () => {
    setSBOpen(false);
    console.log("Snackbar closed");
  };

  // Original Share Component
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Copies the link from the url, called in list item of share component dialog
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setSBOpen(true);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <SendRoundedIcon style={{ color: "#6e767d" }} />
      </IconButton>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <List>
          <ListItem button className={classes.ListItems} onClick={copyLink}>
            <ListItemAvatar>
              <Avatar>
                <LinkRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Copy Chirp Link</ListItemText>
          </ListItem>

          <ListItem button className={classes.ListItems}>
            <ListItemAvatar>
              <Avatar>
                <SaveAltRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>Add Chirp to Saves</ListItemText>
          </ListItem>
        </List>
      </Dialog>

      {/* It needs to be inside render ffs
        It pops up when user made a choice on share function*/}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={sbOpen}
        autoHideDuration={1000}
        onClose={handleSBClose}
      >
        <SnackbarContent
          style={{ backgroundColor: "#2196F3", color: "#D9D9D9" }}
          message={"Link Copied"}
        />
      </Snackbar>
    </>
  );
};

export default MakeSend;
