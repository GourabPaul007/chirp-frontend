import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  Card,
  TextField,
  Grid,
  Container,
} from "@material-ui/core/";

import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
    },
    // minWidth: 400,
    margin: 0,
    padding: 0,
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  card: {
    border: "1px solid #777",
    background: "#000",
    marginTop: 20,
    borderRadius: 15,
  },
  tweetButton: {
    marginRight: 10,
    backgroundColor: "#2196F3",
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 25,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
}));

const MakeTweet = () => {
  const classes = useStyles();

  const [name, setName] = useState("paul");
  const [body, setBody] = useState("");

  const [profile, setProfile] = useContext(ProfileContext);

  const { currentUser } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    const name = profile.name;
    const username = profile.username;
    const uid = profile.uid;

    // Sending Post request to api to post tweet
    if (name && body) {
      await axios.post("http://localhost:5000/api/tweets/new", {
        name,
        username,
        uid,
        body,
      });
    } else {
      console.log("please provide tweet name & body");
    }
    setName(null);
    setBody(null);
  };

  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3} direction="column" justify="flex-start">
            <Grid item xs={12}>
              <Typography variant="h1" className={classes.title}>
                Home
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form noValidate autoComplete="off" onSubmit={handleClick}>
                <Grid item>
                  {/* <Grid item>
                    <TextField
                      id="filled-basic"
                      variant="standard"
                      fullWidth
                      label="Name"
                      margin="none"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid> */}
                  <Grid item style={{ marginTop: 20 }}>
                    <TextField
                      id="filled-basic"
                      label="Whats Happening"
                      variant="outlined"
                      multiline
                      rows={5}
                      rowsMax={10}
                      fullWidth
                      margin="none"
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                  <Grid item>
                    <Button className={classes.tweetButton} onClick={handleClick}>
                      Chirp
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MakeTweet;
