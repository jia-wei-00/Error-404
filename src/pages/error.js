import { Button, Stack } from "@mui/material";
import React from "react";
import { Wrapper } from "../components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Wrapper>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh", textAlign: "center" }}
      >
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button variant="contained">
          <Link to="/" style={{ color: "white" }}>
            Back
          </Link>
        </Button>
      </Stack>
    </Wrapper>
  );
};

export default NotFound;
