import React, { useEffect } from "react";
import "../styles/pages/favourite.scss";
import { fireStore } from "../store";
import { observer } from "mobx-react-lite";

const Favourite = (data) => {
  const list = ["bitcoin", "ethereum", "hello", "bello"];

  useEffect(() => {
    fireStore.fetchFavouriteList();
  }, []);


  return (
    <div>
      Favourite
      <button
        onClick={() => {
          fireStore.getFavouriteList();
        }}
      >
        Post
      </button>
    </div>
  );
};

export default observer(Favourite);
