import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore, fireStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import TextField from "@mui/material/TextField";
import ParticleComponent from "../components/ParticleComponents";
import Modal from "../components/details-modal.tsx";
import "../components/details-modal.tsx";
import Paper from "@mui/material/Paper";
import { Grow } from "@mui/material";

const Home = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState("");
  const [viewCard, setViewCard] = useState(4);

  useEffect(() => {
    apiStore.fetchList();
  }, []);

  // Screen size refer
  // sx: 0px
  // sm: 600px
  // md: 960px
  // lg: 1280px
  // xl: 1920px

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 650) {
      setViewCard(1);
    } else if (width <= 960) {
      setViewCard(2);
    } else if (width <= 1300) {
      setViewCard(3);
    } else if (width >= 1400) {
      setViewCard(4);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div>
        <ParticleComponent />
        <Wrapper>
          <div className="homepage">
            <div
              className="top-crypto"
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              {apiStore.coin_list && apiStore.coin_list.length > 0 ? (
                apiStore.coin_list
                  .filter((coin) => coin.name.toLowerCase().includes(search))
                  .slice(0, viewCard)
                  .map((coin, key) => {
                    return (
                      <Grow
                        in={coin}
                        style={{ transformOrigin: "0 0 0" }}
                        {...(coin ? { timeout: key * 1000 } : {})}
                        key={coin.id}
                      >
                        <Paper sx={{ width: "100%" }}>
                          <div
                            className="d-flex best-coin"
                            onClick={() => {
                              setOpen(true);
                              setCoinId(coin.id);
                              apiStore.clearDetails();
                            }}
                          >
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
                        </Paper>
                      </Grow>
                    );
                  })
              ) : (
                <div>Loading</div>
              )}
            </div>
          </div>
          <div>
            <div className="crypto-search">
              <TextField
                className="crypto-search-field"
                id="standard-basic"
                label="Search"
                variant="standard"
                onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
              />
            </div>
          </div>
          <StickyHeadTable search={search} slice={viewCard} />
        </Wrapper>
      </div>
      <Modal popup_index={coinId} open={open} setOpen={setOpen} />
    </>
  );
};

export default observer(Home);
