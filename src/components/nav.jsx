import React from "react";
import "../styles/components/nav.scss";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";

const Nav = () => {
  return (
    <header>
      <Wrapper>
        <div>
          <Link to="/">Logo</Link>
        </div>
        <ul className="navbar">
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
        </ul>
      </Wrapper>
    </header>
  );
};

export default Nav;
