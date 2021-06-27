import { makeStyles } from "@material-ui/core";

// ========================================================================================
// ========================================================================================
// CommentSection Styles

export const useStyles_CommentSection = makeStyles({
  commentSection: {
    margin: "auto",
    border: "1px solid #777",
    borderRadius: 15,
  },
  wholeCommentWithReplies: {
    borderBottom: "1px solid #777",
  },
  onlyComment: {
    /*each (comment with replies section) has its own border radius & stuff.
    And it overlaps comment section border radius*/
    borderRadius: 15,
    backgroundColor: "#000",
  },
  commentTitle: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 20,
  },
  commentSubheader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
    fontSize: 16,
  },
  commentBody: {
    textAlign: "left",
    marginTop: 0,
    marginLeft: 56,
    paddingTop: 0,
    color: "#D9D9D9",
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
    color: "#6e767d",
    paddingTop: 0,
  },
});

// ========================================================================================
// ========================================================================================
// ReplySection Styles

export const useStyles_ReplySection = makeStyles({
  commentBox: {
    // border: "2px solid #fff",
    borderTop: "1px solid #2F3336",
    borderBottom: "1px solid #2F3336",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    // borderRadius: 5,
  },
  replyCard: {
    margin: "auto",
    // borderTop: "1px solid #2F3336",
    // borderBottom: "1px solid #2F3336",
    // borderRadius: 15,
    marginTop: 0,
    marginBlock: 0,
    paddingTop: 0,
    background: "#000000",
  },
  replyTitle: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 20,
  },
  replySubheader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
    fontSize: 16,
  },
  replyBody: {
    textAlign: "left",
    marginTop: 0,
    marginLeft: 55,
    paddingTop: 0,
    color: "#fff",
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
    color: "#6e767d",
    paddingTop: 0,
  },
});
