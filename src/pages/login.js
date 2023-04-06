import { Button, Input } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../styles/pages/login.scss";
import { Wrapper } from "../components";
import { observer } from "mobx-react-lite";
import { firebaseStore } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (firebaseStore.user) {
      navigate("/home");
    }
  }, [firebaseStore.user]);

  const login = (e) => {
    e.preventDefault();
    firebaseStore.signInAPI(username, password);
  };

  const googleLogin = (e) => {
    e.preventDefault();
    firebaseStore.googleSignIn();
  };

  return (
    <Wrapper>
      <div className="login-box">
        <form className="login-form">
          <Input
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Email"
          />
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          
          <Button type="submit" onClick={(e) => login(e)}>
            Login
          </Button>

          Or

          <Button type="submit" onClick={(e) => googleLogin(e)}>
            Google
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

export default observer(Login);
