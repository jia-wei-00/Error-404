import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";
import { Wrapper } from "../components";
import {StickyHeadTable} from "../components";

const Home = () => {
  return (
    <div>
      <Wrapper>
        <div className="homepage">
        <div className="top-crypto">
            <div id='box1'>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
          </div>
          <div className="crypto-search">
                <input type='text' placeholder='Search'/>
          </div>
          <div className="crypto-list">
            <StickyHeadTable/>
          </div>
        </div>

      </Wrapper>
    </div>



    // <div>
    //   Home
    //   <button
    //     onClick={() => {
    //       apiStore.fetchList();
    //       console.log(apiStore.coin_list);
    //     }}
    //   >
    //     Click
    //   </button>
    //   <ul>
    //     {apiStore.coin_list.length > 0 ? (
    //       apiStore.coin_list.map((coin, key) => {
    //         return <li key={key}>{coin.name}</li>;
    //       })
    //     ) : (
    //       <li>Loading</li>
    //     )}
    //   </ul>
    // </div>
  );
};

export default observer(Home);
