import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import { log } from "../tools";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Home = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  useEffect(() => {
    // apiStore.fetchList();
  }, []);

  log(apiStore.coin_list);

  return (
    <>
      {/* <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#efe094",
                    },
                },
                fpsLimit: 75,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        > */}
      <div>
        <Wrapper>
          <div className="homepage">
            <div className="top-crypto">
              {apiStore.coin_list.length > 0 ? (
                apiStore.coin_list.slice(0, 4).map((coin, key) => {
                  return (
                    <div className="d-flex best-coin">
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
                  );
                })
              ) : (
                <div>Loading</div>
              )}
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

      <div>
        {apiStore.coin_list.length > 0 ? (
          apiStore.coin_list.slice(0, 4).map((coin, key) => {
            return (
              <>
                {" "}
                {coin.name} {coin.atl_date}
              </>
            );
          })
        ) : (
          <li>Loading</li>
        )}
      </div>
      {/* </Particles> */}
    </>
  );
};

export default observer(Home);
