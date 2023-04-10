import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { authStore } from "../store";
import GoogleButton from "react-google-button";
import { observer } from "mobx-react-lite";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import "../styles/components/login-modal.scss";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#3B3B3B",
    },
  },
});

const LoginModal = () => {
  const [value, setValue] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleSignIn = () => {
    authStore.googleSignIn().then((res) => {
      authStore.setLoginModal(false);
    });
  };

  const submit = () => {
    if (value === 1) {
      authStore
        .signUp(email, password)
        .then((res) => {
          authStore.setLoginModal(false); // Execute this only when the Promise resolves successfully
        })
        .catch((err) => {
          authStore.setLoginModal(true);
        });
    } else {
      authStore
        .signInAPI(email, password)
        .then((res) => {
          authStore.setLoginModal(false); // Execute this only when the Promise resolves successfully
        })
        .catch((err) => {
          authStore.setLoginModal(true);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        onClose={() => authStore.setLoginModal(false)}
        open={authStore.login_modal}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper
          sx={{
            padding: "15px 30px 30px 30px",
            textAlign: "center",
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </DialogTitle>
          <Paper
            sx={{
              padding: "30px 25px 50px 25px",
              marginBottom: "20px",
              rowGap: "30px",
              display: "flex",
              flexDirection: "column",
            }}
            elevation={2}
            className="input"
          >
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
          </Paper>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="contained" onClick={submit}>
              {value === 1 ? "Signup" : "Login"}
            </Button>
            <Button
              variant="contained"
              onClick={() => authStore.setLoginModal(false)}
            >
              Close
            </Button>
          </Stack>
          <div style={{ padding: "20px 0" }}> OR</div>
          <Stack alignItems="center">
            <GoogleButton
              className="google-btn"
              type="dark"
              style={{
                backgroundColor: "#3B3B3B",
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                textTransform: "uppercase",
              }}
              onClick={googleSignIn}
            />
          </Stack>
        </Paper>
      </Dialog>
    </ThemeProvider>
  );
};

export default observer(LoginModal);
