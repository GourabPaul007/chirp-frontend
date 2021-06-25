import React from "react";

import { IconButton } from "@material-ui/core";

import SendRoundedIcon from "@material-ui/icons/SendRounded";

const MakeSend = () => {
  return (
    <>
      <IconButton>
        <SendRoundedIcon style={{ color: "#6e767d" }} />
      </IconButton>
    </>
  );
};

export default MakeSend;
