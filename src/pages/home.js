import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import {log} from "../tools";

const Home = () => {
  useEffect(() => {
    apiStore.fetchList();
  }, []);

  log(apiStore.coin_list);

  return (
    <>
      <div>
        <Wrapper>
          <div className="homepage">
            <div className="top-crypto">
              <div>
                <div>
                  
                </div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
            <div className="crypto-search">
              <input type="text" placeholder="Search" />
            </div>
            <div className="crypto-list">
              <StickyHeadTable />
            </div>
          </div>
        </Wrapper>
      </div>

      {/* <div>
          {apiStore.coin_list.length > 0 ? (
            apiStore.coin_list.map((coin, key) => {
              return <li key={key}>{coin.name} {coin.atl_date}</li>;
            })
          ) : (
            <li>Loading</li>
          )}
      </div> */}
    </>
  );
};

export default observer(Home);
