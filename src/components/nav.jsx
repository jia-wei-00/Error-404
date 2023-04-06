import React from "react";
import "../styles/components/nav.scss";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import { observer } from "mobx-react-lite";
import { firebaseStore } from "../store";

const Nav = () => {
  return (
    <header>
      <Wrapper>
        <div>
          <Link to="/">Logo</Link>
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
          {firebaseStore.user && (
            <button onClick={() => firebaseStore.signOut()}>Logout</button>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default observer(Nav);
