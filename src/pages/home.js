import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";

const Home = () => {
  return (
    <div>
      Home
      <button
        onClick={() => {
          apiStore.fetchList();
          console.log(apiStore.coin_list);
        }}
      >
        Click
      </button>
      <ul>
        {apiStore.coin_list.length > 0 ? (
          apiStore.coin_list.map((coin, key) => {
            return <li key={key}>{coin.name}</li>;
          })
        ) : (
          <li>Loading</li>
        )}
      </ul>
    </div>
  );
};

export default observer(Home);
