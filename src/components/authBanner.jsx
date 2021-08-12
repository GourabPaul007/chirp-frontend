import { Button, Container } from "@material-ui/core";
import { BrowserRouter as Router, Link } from "react-router-dom";

const AuthBanner = () => {
  return (
    <>
      <Container style={{ marginTop: 12 }}>
        <Router>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button>Sign Up</Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button>Log In</Button>
          </Link>
        </Router>
      </Container>
    </>
  );
};

export default AuthBanner;
