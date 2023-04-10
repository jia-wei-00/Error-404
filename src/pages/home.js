import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore, fireStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import TextField from "@mui/material/TextField";
import ParticleComponent from '../components/ParticleComponents';


const Home = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiStore.fetchList();
  }, []);

  // log(apiStore.coin_list);

  return (
    <>
      <div>
      <ParticleComponent />
          <Wrapper>
            <div className="homepage">
              <div
                className="top-crypto"
                style={{
                  // overflowX: "scroll",
                  display: "flex",
                  flexWrap: "nowrap",
                }}
              >
                {apiStore.coin_list && apiStore.coin_list.length > 0 ? (
                  apiStore.coin_list
                    .filter((coin) => coin.name.toLowerCase().includes(search))
                    .slice(0, 4)
                    .map((coin, key) => {
                      return (
                        <div className="d-flex best-coin" key={key}>
                          <div className="best-coin-image">
                            <img src={coin.image} />
                          </div>
                          <div className="best-coin-name">{coin.name}</div>
                          <div className="d-flex best-coin-price">
                            <p>Current Price:</p>
                            <p>RM {coin.current_price}</p>
                          </div>
                          <div className="best-coin-24HL">
                            <div className="d-flex best-coin-24HL-high">
                              <div>
                                <b>ATH (Today)</b>
                              </div>
                              <h2>{coin.high_24h}</h2>
                            </div>
                            <div className="d-flex best-coin-24HL-low">
                              <div>
                                <b>ATL (Today)</b>
                              </div>
                              <h2>{coin.low_24h}</h2>
                            </div>
                          </div>
                          <div className="d-flex best-coin-mc">
                            <div className="best-coin-mc-title">
                              <b>Total Market Cap</b>
                            </div>
                            <div>
                              <strong>RM</strong>
                              {coin.market_cap}
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>Loading</div>
                )}
              </div>
              <div className="crypto-search">
                <TextField className="crypto-search-field"
                  id="standard-basic"
                  label="Search"
                  variant="standard"
                  onChange={(e) =>
                    setSearch(e.target.value.toLocaleLowerCase())
                  }
                />
              </div>
              <StickyHeadTable search={search} />
            </div>
          </Wrapper>
      </div>
      
      {/* <div>
        {apiStore.coin_list.length > 0 ? (
          apiStore.coin_list.slice(0, 4).map((coin, key) => {
            return (
              <>
                {" "}
              </>
            );
          })
        ) : (
          <li>Loading</li>
        )}
      </Particles>
      </div> */}
    </>
  );
};

export default observer(Home);
