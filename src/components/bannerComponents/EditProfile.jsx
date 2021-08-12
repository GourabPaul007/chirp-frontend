import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
  Avatar,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import axios from "axios";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import { useHistory } from "react-router-dom";
import Banner from "../banner";
import { useAuth } from "../../contexts/authContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditProfile() {
  const classes = useStyles();

  const nameRef = useRef();
  const aboutRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useContext(ProfileContext);
  const { currentUser } = useAuth();
  const history = useHistory();

  // goback function
  function goBackToProfilePage() {
    history.push("/profile");
  }

  // dialogbox Stuff
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
    goBackToProfilePage();
  };

  async function handleUpdateProfile(e) {
    e.preventDefault();
    // update request to server for new data
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/user/${currentUser.uid}/updateUser`;
      await axios.post(url, {
        name: nameRef.current.value,
        displayName: currentUser.displayName,
        email: currentUser.email,
        about: aboutRef.current.value,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      // if fails then show dialog
      setDialogOpen(true);
    }

    // Set state after updating
    setProfile({
      id: currentUser.id,
      name: nameRef.current.value,
      displayName: currentUser.displayName,
      email: currentUser.email,
      about: aboutRef.current.value,
    });
    goBackToProfilePage();
  }

  return (
    <>
      <Grid item xs={2} sm={4} lg={4}>
        <Banner />
      </Grid>
      <Grid item xs={8} sm={6} lg={5}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                inputRef={nameRef}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="About you"
                multiline
                rows={5}
                inputRef={aboutRef}
              />
              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleUpdateProfile}
              >
                Save
              </Button>
            </form>

            {/* Dialog Box if something goes wrong */}
            <Dialog
              open={dialogOpen}
              onClose={goBackToProfilePage}
              PaperProps={{
                style: {
                  backgroundColor: "#000",
                  border: "1px solid #777",
                  color: "#b71c1c",
                },
              }}
            >
              <DialogContent>
                <DialogContentText>Something Went Wrong</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ backgroundColor: "#f44336", color: "#fff" }}
                  onClick={handleClose}
                  color="primary"
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </Grid>
    </>
  );
}
