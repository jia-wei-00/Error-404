import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import { log } from "../tools";
import TextField from "@mui/material/TextField";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import zIndex from "@mui/material/styles/zIndex";
// import multiImage from "tsparticles-preset-multi-image";


const Home = () => {
  const [search, setSearch] = useState("");

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  // useEffect(() => {
  //   getCoinList();
  // }, []);

  useEffect(() => {
    apiStore.fetchList();
  }, []);

  // log(apiStore.coin_list);

  return (
    <>
      <div>
        {/* <Particles  id="tsparticles" style={{zIndex: '-1'}}
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
    fpsLimit: 60,
    background: {
        color: {
            value: "#ffffff",
        },
    },
    particles: {
        color: {
            value: ["#e6ebf0", "#c3d0e5", "#8ca6d1", "#687fa9"],
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 5,
            random: true,
        },
        opacity: {
            value: 0.6,
            random: true,
        },
        lineLinked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outMode: "bounce",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
            },
        },
        number: {
            value: 100,
        },
        images: {
            sources: [
                {
                    density: 1,
                    image: {
                        src: "/path/to/your/image1.png",
                    },
                },
                {
                    density: 1,
                    image: {
                        src: "/path/to/your/image2.png",
                    },
                },
                // Add as many images as you want
            ],
        },
    },
    detectRetina: true,
    preset: multiImage,
}} */}

        {/* /> */}
        <Wrapper>
          <div className="homepage">
            <div className="top-crypto" style={{ overflowX: 'scroll', display: 'flex', flexWrap: 'nowrap' }}>
              {apiStore.coin_list.length > 0 ? (
                apiStore.coin_list
                  .filter((coin) => coin.name.toLowerCase().includes(search))
                  .slice(0, 4)
                  .map((coin, key) => {
                    return (
                      <div className="d-flex best-coin" key={key}>
                        <div className="best-coin-image">
                          <img src={coin.image} />
                        </div>
                        <div className="best-coin-name">
                          {coin.name}
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
