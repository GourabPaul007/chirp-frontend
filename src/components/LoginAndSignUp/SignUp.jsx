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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import axios from "axios";

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

export default function SignUp() {
  const classes = useStyles();

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { signup, currentUser } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // error checking
    if (passwordRef.current.value < 6) {
      return setError("Password must be atleast 6 Characters");
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    // signing up, errorMessage is returned from signup method in auth context
    const errorMessage = await signup(
      nameRef.current.value,
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    setLoading(false);
    if (errorMessage) {
      setError(`Failed to create an Account.\n ${errorMessage ? errorMessage : ""}`);
      console.log(errorMessage, error);
    } else {
      history.push("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* {currentUser && JSON.stringify(currentUser.email)} */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error ? (
          <Typography
            style={{
              color: "#e1868f",
              backgroundColor: "#430c11",
              padding: 16,
              marginTop: 16,
              border: "1px solid #68121b",
              borderRadius: 8,
            }}
          >
            {error}
          </Typography>
        ) : null}
        <form className={classes.form} noValidate>
          {/* Name TextField */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            inputRef={nameRef}
          />
          {/* Username TextField */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            type="username"
            inputRef={usernameRef}
          />
          {/* Email TextField */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            inputRef={emailRef}
          />
          {/* Password TextField */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
          />
          {/* Confirm Password TextField */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            inputRef={confirmPasswordRef}
          />
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container style={{ display: "flex", justifyContent: "center" }}>
            <Link href="http://localhost:3000/login" variant="body2">
              {"Have an account? Log In"}
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
