import { NavLink } from "react-router-dom";
import { Button, CssBaseline, Toolbar } from "@mui/material";

const ErrorPage = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <Toolbar />
      <CssBaseline />
      <div>
        <h2 style={{ fontSize: "7rem", margin: "2rem" }}>404</h2>
        <h3 style={{ fontSize: "4rem" }}>UH OH! You're lost.</h3>
        <p style={{ margin: "2rem" }}>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>

        <NavLink to="/">
          <Button variant="contained">Go Back to Home</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
