import React from "react";
import "../styles/components/nav.scss";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import { observer } from "mobx-react-lite";
import { authStore, fireStore } from "../store";

import LoginModal from "./login-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Nav = () => {
  const logout = () => {
    authStore.signOut().then((res) => {
      fireStore.setFavouriteList(null);
    });
  };

  return (
    <header>
      <Wrapper>
        <div>
          <Link to="/">Logo</Link>
        </div>
        <div className="menu">
          <ul className="menu-navbar">
            <li>
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favourite" className="link">
                Favourite
              </Link>
            </li>
            {/* <li>
              <Link to="/modal" className="link">
                Modal
              </Link>
            </li> */}
            <li>
              <Link to="/testing" className="link">
                Testing
              </Link>
            </li>
          </ul>
          {authStore.user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={() => authStore.setLoginModal(true)}>
              Sign In/ Sign Up
            </button>
          )}
        </div>
      </Wrapper>

      <LoginModal />
    </header>
  );
};

export default observer(Nav);
