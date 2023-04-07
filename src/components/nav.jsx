import React from "react";
import "../styles/components/nav.scss";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import { observer } from "mobx-react-lite";
import { authStore } from "../store";

const Nav = () => {


  return (
    <header>
      <Wrapper>
        <div>
          <Link to={authStore.user ? "/home" : "/"}>Logo</Link>
        </div>
        <div className="menu">
          <ul className="menu-navbar">
            <li>
              <Link to="/home" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favourite" className="link">
                Favourite
              </Link>
            </li>
            <li>
              <Link to="/modal" className="link">
                Modal
              </Link>
            </li>
          </ul>
          {authStore.user && (
            <button onClick={() => authStore.signOut()}>Logout</button>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default observer(Nav);
