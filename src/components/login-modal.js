import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import { authStore } from "../store";
import GoogleButton from "react-google-button";
import Paper from "@mui/material/Paper";

const LoginModal = ({ open, setOpen }) => {
  const [value, setValue] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleSignIn = () => {
    authStore.googleSignIn().then((res) => {
      setOpen(false);
    });
  };

  const submit = () => {
    if (value === 1) {
      authStore
        .signUp(email, password)
        .then((res) => {
          setOpen(false); // Execute this only when the Promise resolves successfully
        })
        .catch((err) => {
          setOpen(true);
        });
    } else {
      authStore
        .signInAPI(email, password)
        .then((res) => {
          setOpen(false); // Execute this only when the Promise resolves successfully
        })
        .catch((err) => {
          setOpen(true);
        });
    }

    setOpen(false);
  };

  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      //   fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
    >
      <Paper sx={{ padding: "30px", textAlign: "center" }}>
        <DialogTitle id="alert-dialog-title">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </DialogTitle>
        <DialogContent className="input">
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <Button onClick={submit}>{value === 1 ? "Signup" : "Login"}</Button>
        <Button onClick={() => setOpen(false)}>Close</Button>
        <div style={{ padding: "20px 0" }}> OR</div>

        <GoogleButton
          className="google-btn"
          type="dark"
          style={{ margin: "10px 0" }}
          onClick={googleSignIn}
        />
      </Paper>
    </Dialog>
  );
};

export default LoginModal;
