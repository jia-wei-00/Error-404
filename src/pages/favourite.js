import React, { useEffect } from "react";
import "../styles/pages/favourite.scss";
import { authStore, fireStore } from "../store";
import { observer } from "mobx-react-lite";

const Favourite = (data) => {
  const list = ["bitcoin", "ethereum", "hello", "bello"];

  useEffect(() => {
    if (authStore.user) {
      fireStore.fetchFavouriteList();
    }
  }, []);

  return (
    <div>
      Favourite
      <button
        onClick={() => {
          authStore.user && fireStore.getFavouriteList();
        }}
      >
        Post
      </button>
    </div>
  );
};

export default observer(Favourite);
