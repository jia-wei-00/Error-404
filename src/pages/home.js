import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "../styles/pages/home.scss";
import { apiStore } from "../store";
import { Wrapper } from "../components";
import { StickyHeadTable } from "../components";
import { log } from "../tools";
// import Particles from 'react-particles';
// import {loadFull} from 'tsparticles';


const Home = () => {

  // const particlesInit = useCallback(async engine =>{
  //   console.log(engine);

  //   await loadFull(engine);
  // }, []);

  // const particlesLoaded = useCallback(async container =>{
  //   await console.log(container);

  //   return <Particles id='tsparticles' url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
  // })

  log(apiStore.coin_list);

  return (
    <>
      <div>
        <Wrapper>
          <div className="homepage">
            <div className="top-crypto">
              {apiStore.coin_list.length > 0 ? (
                apiStore.coin_list.slice(0, 4).map((coin, key) => {
                  return (
                    <div>
                      <div className="best-coin"><img src={coin.image}/></div>
                      <div>{coin.current_price}</div>
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
    </>
  );
};

export default observer(Home);
