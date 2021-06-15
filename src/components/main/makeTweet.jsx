import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 600,
    },
    minWidth: 400,
    margin: "auto",
    padding: 0,
  },
  title: {
    fontSize: 48,
  },
  card: {
    // borderBottom: "1px solid #777",
    // background: "linear-gradient(45deg, #e91e63 50%, #ec407a 90%)",
    background: "#000000",
    marginTop: 20,
    borderRadius: 15,
  },
  tweetButton: {
    // marginLeft: "auto",
    marginRight: 10,
    backgroundColor: "#2196F3",
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
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

  const handleClick = async (e) => {
    e.preventDefault();
    // setName("paul");

    const date = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const time = `${month} ${day}, ${year}`;
    console.log(time);

    // Sending Post request to api to post tweet
    if (name && body) {
      await axios.post("http://localhost:5000/api/tweets/new", { name, body, date });
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
                  <Grid item>
                    <TextField
                      id="filled-basic"
                      variant="filled"
                      fullWidth
                      label="Name"
                      margin="none"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="filled-basic"
                      label="Whats Happening"
                      variant="filled"
                      multiline
                      fullWidth
                      margin="none"
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                  <Grid item>
                    <Button className={classes.tweetButton} onClick={handleClick}>
                      Tweet
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
