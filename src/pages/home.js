import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import TextField from "@mui/material/TextField";
import Modal from "../components/details-modal.tsx";
import "../components/details-modal.tsx";
import Paper from "@mui/material/Paper";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState("");

  useEffect(() => {
    apiStore.fetchList();
  }, []);

  // log(apiStore.coin_list);

  return (
    <>
      <div>
        <Wrapper>
          <div className="homepage">
            <div className="top-crypto">
              {apiStore.coin_list.length > 0 ? (
                apiStore.coin_list
                  .filter((coin) => coin.name.toLowerCase().includes(search))
                  .slice(0, 4)
                  .map((coin, key) => {
                    return (
                      <Paper sx={{ width: "100%" }}>
                        <div
                          className="d-flex best-coin"
                          key={key}
                          onClick={() => {
                            setOpen(true);
                            setCoinId(coin.id);
                            apiStore.clearDetails();
                          }}
                        >
                          <div className="best-coin-image">
                            <img src={coin.image} />
                          </div>
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
                      </Paper>
                    );
                  })
              ) : (
                <div>Loading</div>
              )}
            </div>
            <div className="crypto-search">
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
                onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
              />
            </div>
            <StickyHeadTable search={search} />
          </div>
        </Wrapper>
      </div>
      <Modal popup_index={coinId} open={open} setOpen={setOpen} />
    </>
  );
};

export default observer(Home);
