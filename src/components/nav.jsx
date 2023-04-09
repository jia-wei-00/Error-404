import React from "react";
import "../styles/components/nav.scss";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";
import { observer } from "mobx-react-lite";
import { authStore } from "../store";

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
  const [open, setOpen] = React.useState(false);

  return (
    <header>
      <Wrapper>
        <div>
          <Link to={authStore.user ? "/home" : "/"}>Logo</Link>
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
            <button onClick={() => authStore.signOut()}>Logout</button>
          ) : (
            <button onClick={() => setOpen(true)}>Sign In/ Sign Up</button>
          )}
        </div>
      </Wrapper>

      <LoginModal open={open} setOpen={setOpen} />
    </header>
  );
};

export default observer(Nav);
