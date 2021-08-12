import React, { useState } from "react";
import { Button, Typography, Menu, MenuItem, Link } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { useStyles } from "./_bannerStyles";
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";

function More() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  async function handleLogOut() {
    setError("");
    try {
      console.log(JSON.stringify(currentUser ? currentUser.email : "nothing"));
      await logout();
      // console.log(JSON.stringify(currentUser.email));
      setAnchorEl(null);
      history.push("/login");
    } catch (e) {
      console.log(e);
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Button className={`${classes.button} ${classes.morebtn}`} onClick={handleClick}>
        <MoreHorizIcon className={classes.btnIcons} />
        <Typography component="h3" className={classes.btnText}>
          More
        </Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#000",
            border: "1px solid #fff",
            minWidth: 40,
            width: 150,
            borderRadius: 10,
          },
        }}
      >
        <MenuItem className={classes.moreMenuItems} onClick={handleClose}>
          <Link
            href={"/profile"}
            style={{ textDecoration: "none", textTransform: "none", color: "#fff" }}
          >
            My Profile
          </Link>
        </MenuItem>
        <MenuItem className={classes.moreMenuItems} onClick={handleClose}>
          <Link
            href={"/update-account"}
            style={{ textDecoration: "none", textTransform: "none", color: "#fff" }}
          >
            Update Account
          </Link>
        </MenuItem>
        <MenuItem className={classes.moreMenuItems} onClick={handleLogOut}>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
}

export default More;
