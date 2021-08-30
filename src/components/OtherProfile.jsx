import {
  Avatar,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
  Link,
  CardContent,
  IconButton,
  Icon,
} from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getUserByUsername } from "../utils/getUserUtils";
import Banner from "./banner";
import profilePicture from "../assets/images/profile-picture.jpg";
import axios from "axios";
import getRandomColor from "../utils/getRandomThemeColor";

const useStyles = makeStyles({
  rootCard: {
    backgroundColor: "#000",
    marginTop: 40,
    border: "1px solid #777",
    borderRadius: 15,
  },
  media: {
    height: 240,
    width: 240,
  },
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
  avatar: {
    marginLeft: 60,
    marginRight: 24,
    height: 100,
    width: 100,
    backgroundColor: `${getRandomColor()}`,
  },
});

export default function OtherProfile() {
  const classes = useStyles();
  const { username } = useParams();
  const [user, setUser] = useState();

  useEffect(async () => {
    const userdata = await axios.get(
      `http://localhost:5000/api/user/${username}/getUserByUsername`
    );
    setUser(userdata.data);
  }, []);

  return (
    <>
      <Grid item xs={2} sm={4} lg={4}>
        <Banner />
      </Grid>
      <Grid item xs={8} sm={6} lg={5}>
        <Card className={classes.rootCard}>
          {/* Go Back Component */}
          <CardContent className={classes.goBack}>
            <IconButton style={{ marginLeft: 0 }} onClick={window.history.back()}>
              <ArrowBackRoundedIcon />
            </IconButton>
            <Typography style={{ marginLeft: 8, paddingTop: 8, fontSize: 20 }}>Back</Typography>
          </CardContent>
          <Grid container>
            <Grid item style={{ margin: 4 }}>
              {/* <Avatar className={classes.media} src={profilePicture} title="Profile Picture" /> */}
              <Avatar className={classes.avatar}>
                <Icon>{user ? user.name[0] : ""}</Icon>
              </Avatar>
            </Grid>
            <Grid item style={{ marginLeft: 0, marginTop: 0, marginRight: "auto" }}>
              <Typography style={{ fontSize: 24, color: "#D9D9D9" }} align="left">
                {user ? user.name : ""}
              </Typography>
              <Typography style={{ fontSize: 16, color: "#777" }} align="left">
                @{user ? user.username : ""}
              </Typography>
              <Typography
                style={{ fontSize: 16, color: "#D9D9D9", marginTop: 16, marginBottom: 16 }}
                align="left"
              >
                {user.about ? user.about : "No information given"}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
