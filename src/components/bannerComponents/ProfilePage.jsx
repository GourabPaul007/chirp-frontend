import { Grid, Card, makeStyles, Typography, Avatar, Button, Link } from "@material-ui/core";
import React, { useContext } from "react";
import Banner from "../banner";

import profilePicture from "../../assets/images/profile-picture.jpg";

import { ProfileContext } from "../../contexts/ProfileContext";
import { useAuth } from "../../contexts/authContext";

const useStyles = makeStyles({
  rootCard: {
    backgroundColor: "#000",
    marginTop: 40,
    // border: "1px solid #777",
    borderRadius: 15,
  },
  media: {
    height: 240,
    width: 240,
  },
});

export default function ProfilePage() {
  const classes = useStyles();

  const [profile, setProfile] = useContext(ProfileContext);
  const { currentUser } = useAuth();

  const msg = "";

  return (
    <>
      <Grid item xs={2} sm={4} lg={4}>
        <Banner />
      </Grid>
      <Grid item xs={8} sm={6} lg={5}>
        <Card className={classes.rootCard}>
          <Grid container>
            <Grid item style={{ margin: 4 }}>
              <Avatar className={classes.media} src={profilePicture} title="Profile Picture" />
            </Grid>
            <Grid item style={{ marginLeft: 40, marginTop: 24 }}>
              <Typography style={{ fontSize: 24, color: "#D9D9D9" }} align="left">
                {profile ? profile.name : ""}
              </Typography>
              <Typography style={{ fontSize: 16, color: "#777" }} align="left">
                @{currentUser.displayName}
              </Typography>
              <Typography style={{ fontSize: 16, color: "#D9D9D9", marginTop: 16 }} align="left">
                {profile ? profile.about : "No information given"}
              </Typography>
              <Link href={"/edit-profile"} style={{ textTransform: "none", color: "#fff" }}>
                <Button
                  style={{
                    color: "#0288D1",
                    border: "1px solid #0288D1",
                    borderRadius: 30,
                    textTransform: "none",
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 50,
                    float: "left",
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
