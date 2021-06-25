import { makeStyles } from "@material-ui/core";

// ========================================================================================
// ========================================================================================
// TweetBody Styles

export const useStyles_TweetBody = makeStyles((theme) => ({
  card: {
    marginTop: 24,
    marginBottom: 24,
    paddingTop: 16,
    background: "#000000",
    border: "1px solid #777",
    borderRadius: 15,
  },
  dash: {
    border: "1px solid #2F3336",
    marginRight: 20,
    marginLeft: 20,
    borderTopStyle: "none",
  },
  statusBlock: {
    border: "1px solid #2F3336",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    marginRight: 20,
    marginLeft: 20,
  },
  title: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
  },
  username: {
    color: "#D9D9D9",
    fontSize: 16,
    fontWeight: 300,
    marginRight: "auto",
    marginTop: 6,
    marginBottom: "auto",
    marginLeft: 6,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  subHeader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
  },
  tweetBody: {
    textAlign: "left",
    color: "#D9D9D9",
    fontSize: 23,
    paddingLeft: 5,
  },
  likesAndComments: {
    display: "inline-block",
    color: "#777",
  },
}));

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
    marginLeft: 55,
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
