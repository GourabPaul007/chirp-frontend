import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";

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

export default function ForgotPassword() {
  const classes = useStyles();

  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword, currentUser } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (e) {
      setError("Failed to Reset Password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* {currentUser && JSON.stringify(currentUser)} */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {error ? (
          <Typography
            style={{
              backgroundColor: "#FFB6B6",
              color: "#8B0000",
              padding: 8,
              marginTop: 8,
              border: "1px solid black",
              borderRadius: 8,
            }}
          >
            {error}
          </Typography>
        ) : null}
        {message ? (
          <Typography
            style={{
              backgroundColor: "#1a3e29",
              color: "#99e6ab",
              padding: 8,
              marginTop: 8,
              border: "1px solid #255a32",
              borderRadius: 8,
            }}
          >
            {message}
          </Typography>
        ) : null}
        <form className={classes.form} noValidate onSubmit={handleResetPassword}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            inputRef={emailRef}
            autoFocus
          />
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs={12} style={{ marginTop: 8 }}>
              <Link href="http://localhost:3000/login" variant="body2">
                Have an account? Log in.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/"></Link> {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
