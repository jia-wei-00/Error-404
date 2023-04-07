import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "../store";

const Auth = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authStore.user) {
      navigate("/");
    }
  }, [authStore.user, navigate]);

  return <>{children}</>;
};

export default observer(Auth);
