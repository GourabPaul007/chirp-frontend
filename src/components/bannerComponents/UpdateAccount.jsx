import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

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
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();

  // const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { updateEmail, updatePassword, currentUser } = useAuth();

  const handleUpdateProfile = async (e) => {
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);
    e.preventDefault();
    // Error checking edge cases
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.length < 6) {
      return setError("Password must be atleast 6 Characters");
    }
    // if (passwordRef.current.value !== currentUser.password) {
    //   return setError("Wrong Password");
    // }
    // updating stuff
    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        setError("");
        setLoading(true);
        history.push("/");
      })
      .catch((e) => {
        setError("Failed to Update account");
        console.log(e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* {currentUser && JSON.stringify(currentUser.email)} */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" style={{ color: "#D9D9D9" }}>
          Update Profile
        </Typography>
        <Typography component="h6" variant="h6" style={{ paddingTop: 15, color: "#999" }}>
          Leave blank to keep the same
        </Typography>
        {error ? (
          <Typography
            style={{
              color: "#8B0000",
              backgroundColor: "FFB6B6",
              padding: 16,
              marginTop: 16,
              border: "1px solid #fff",
              borderRadius: 8,
            }}
          >
            {error}
          </Typography>
        ) : null}
        <form className={classes.form} noValidate onSubmit={handleUpdateProfile}>
          {/* Username TextField */}
          {/* <TextField
            variant="filled"
            margin="normal"
            fullWidth
            label="Username"
            type="username"
            inputRef={usernameRef}
            defaultValue={currentUser.username}
          /> */}
          {/* Email TextField */}
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            label="Email Address"
            autoFocus
            inputRef={emailRef}
            defaultValue={currentUser.email}
          />
          {/* Password TextField */}
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
            placeholder="Leave blank to keep the same"
          />
          {/* Confirm Password TextField */}
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            inputRef={confirmPasswordRef}
            placeholder="Leave blank to keep the same"
          />
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Update Profile
          </Button>
          <Grid container style={{ display: "flex", justifyContent: "center" }}>
            <Link href="http://localhost:3000" variant="body2">
              {"Go to home page"}
            </Link>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          {/* <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>{" "} */}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
