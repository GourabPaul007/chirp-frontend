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

export default function LogIn() {
  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { login, currentUser } = useAuth();

  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    if (!passwordRef.current.value) {
      return setError("Wrong Password");
    }
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      setError("Failed to Log In");
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
          Log in
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
        <form className={classes.form} noValidate onSubmit={handleLogIn}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            inputRef={emailRef}
            autoFocus
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs={4}>
              <Link href="http://localhost:3000/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={8}>
              <Link href="http://localhost:3000/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
