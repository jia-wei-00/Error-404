import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { firebaseStore } from "../store";

const Auth = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!firebaseStore.user) {
      navigate("/");
    }
  }, [firebaseStore.user, navigate]);

  return <>{children}</>;
};

export default observer(Auth);
