import React, { useState, useEffect } from "react";
// import { FormatListBulleted } from "@mui/icons-material";
// import { Grid } from "@mui/material";
import "../styles/pages/favourite.scss";
import { authStore, fireStore } from "../store";
import { observer } from "mobx-react-lite";

function Coin({ id }) {
  // Retrieve the coin data for the given ID and render it here
  // This will likely involve making an API call to a cryptocurrency data source
  return (
    <div>
      <h2>Coin ID: {id}</h2>
      {/* Render the coin data here */}
    </div>
  );
}


const Favourite = (data) => {
  useEffect(() => {
    if (authStore.user) {
      const data = fireStore.fetchFavouriteList();
      console.log(data);
    }
  }, []);
  // search bar
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // use the query to search for results
    console.log('hello');
  };

  return (
  <div class="wrapper">
      <div class="search-bar">
        <input
          class="search-bar-input"
          type="search"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSearchClick}>Search</button>
      {/* <div class="grid-view-list"> */}
    <div>
      Favourite
      <button
        onClick={() => {
          authStore.user && fireStore.getFavouriteList();
        }}>
        Post
      </button>
    </div>
    <div>
      {}
    </div>
</div>

);
      };

export default observer(Favourite);
