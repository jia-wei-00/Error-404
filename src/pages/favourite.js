import React, {useState} from 'react';
import { FormatListBulleted } from '@mui/icons-material';
import { Grid } from '@mui/material';
import '../styles/pages/favourite.scss';


const Favourite = () => {
    // search bar
    const [query,setQuery] = useState("");

    const handleInputChange = event => {
        setQuery(event.target.value) 
    }

    const handleSearchClick = () => {
    // use the query to search for results
    };

    return (
        <div class="wrapper">

        <div class="search-bar">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input class="search-bar-input" type="search" placeholder="Search" value={query} onChange={handleInputChange}/>
        </div>

        <div class="grid-view-list"> 
            <div class="change-view">
                <button class="btnlist">
                    <FormatListBulleted fontSize=''/>   
                </button>
                <button class="btngrid">
                    <Grid fontSize=''/>
                </button>
            </div>

            <div class="card">
  <img src="img_avatar.png" alt="Picture" ></img>
  <div class="container">
    <h4><b>Bitcoin</b></h4>
    <p>Current Trend</p>
  </div>
</div>

        </div>
    </div>
    )
}

export default Favourite