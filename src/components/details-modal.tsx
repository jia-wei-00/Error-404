import React, { useEffect, Dispatch, SetStateAction } from "react";
import "../styles/components/details-modal.scss";
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import { AxisOptions, Chart } from "react-charts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import { apiStore, authStore, fireStore } from "../store";
import ToggleButton from "@mui/material/ToggleButton";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

type CoinDetails = {
  name?: string;
  description?: { en?: string };
  image?: { large?: string };
  market_cap_rank?: string;
  coingecko_rank?: string;
  market_data?: {
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
    fully_diluted_valuation?: { myr?: number };
    ath?: { myr?: number };
    atl?: { myr?: number };
    current_price?: { myr?: number };
    market_cap?: { myr?: number };
    total_volume?: { myr?: number };
  };
};

type ModalProps = {
  popup_index: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type MyDatum = { timestamp: Date; price: number };

const Modal: React.FC<ModalProps> = ({ popup_index, open, setOpen }) => {
  useEffect(() => {
    if (popup_index) {
      apiStore.fetchDetails(popup_index);
      apiStore.fetchChart(popup_index);
    }
  }, [popup_index]);

  const coin_details: CoinDetails = apiStore.coin_details || {};
  const coin_chart = apiStore.chart_data;
  // ---------------------------------------------Chart---------------------------------------------

  const modified_coin_chart = coin_chart.map((coin_chart_data: number[]) => {
    return {
      timestamp: new Date(coin_chart_data[0]),
      price: coin_chart_data[1],
    };
  });

  const coin_chart_data = [
    {
      label: "Crypto_Value (MYR)",
      data: modified_coin_chart,
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: (datum) => datum.timestamp,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: (datum) => datum.price,
      },
    ],
    []
  );

  const chart_options = {
    data: coin_chart_data,
    primaryAxis,
    secondaryAxes,
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dangerous_html = coin_details.description
    ? (coin_details.description.en as string)
    : "";

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 520,
        tablet: 900,
        laptop: 1200,
        desktop: 1536,
      },
    },
  });

  const fullScreen = useMediaQuery(theme.breakpoints.down("mobile"));

  const favorite = (event: React.MouseEvent, id: number): void => {
    event.stopPropagation();
    if (!authStore.user) {
      authStore.setLoginModal(true);
    } else {
      fireStore.postFavouriteAPI(id);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => setOpen(false)}
      open={open}
      aria-labelledby="responsive-dialog-title"
      maxWidth="desktop"
    >
      <Paper className="modal" sx={{ padding: "1rem" }}>
        {coin_details && coin_chart.length === 0 ? (
          <div className="loading">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              alt="Loading..."
            ></img>
          </div>
        ) : (
          <>
            <div className="content">
              <div className="modal-close">
                <button onClick={handleClose}>✕</button>
              </div>
              <div className="box-main">
                <div className="box-main-1">
                  <img
                    src={coin_details.image && coin_details.image.large}
                    alt=""
                    height={200}
                  />
                  <h1>{coin_details.name}</h1>
                  <div>
                    {/* Favorite:{""} */}
                    <ToggleButton
                      value="check"
                      selected={
                        fireStore.favourite_list &&
                        fireStore.favourite_list.includes(popup_index)
                      }
                      onChange={(event) => {
                        favorite(event, popup_index);
                      }}
                      color="warning"
                      sx={{ borderRadius: "50%" }}
                      size="small"
                    >
                      <StarRoundedIcon />
                    </ToggleButton>
                  </div>
                </div>
                <div className="box-main-2">
                  {dangerous_html === "" ? (
                    <p>No description available</p>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: dangerous_html }}
                    ></div>
                  )}
                </div>
                <div className="box-main-3">
                  <div>
                    <p>Market-Cap Rank: {coin_details.market_cap_rank}</p>
                  </div>
                  <div>
                    <p>Community Rank: {coin_details.coingecko_rank}</p>
                  </div>
                </div>
              </div>
              <div className="box-1">
                <div className="box-flex-1">
                  <p>Price:</p>
                  <p>All-Time High:</p>
                  <p>All-Time Low:</p>
                  <p>Market Cap:</p>
                  <p>Fully Diluted Valuation:</p>
                  <p>Total Volume:</p>
                  <p>Circulating Supply:</p>
                  <p>Total Supply:</p>
                </div>
                <div className="box-flex-2">
                  <div>
                    <p>
                      RM
                      {coin_details.market_data &&
                        coin_details.market_data.current_price?.myr}
                    </p>
                    <p>
                      RM
                      {coin_details.market_data &&
                        coin_details.market_data.ath?.myr}
                    </p>
                    <p>
                      RM
                      {coin_details.market_data &&
                        coin_details.market_data.atl?.myr}
                    </p>
                    <p>RM{coin_details.market_data?.market_cap?.myr}</p>
                    <p>
                      {coin_details.market_data?.fully_diluted_valuation?.myr
                        ? "RM" +
                          coin_details.market_data?.fully_diluted_valuation?.myr
                        : "Not available"}
                    </p>
                    <p>
                      {coin_details.market_data?.total_volume?.myr
                        ? "RM" + coin_details.market_data?.total_volume?.myr
                        : "Not available"}
                    </p>
                    <p>
                      {coin_details.market_data?.circulating_supply
                        ? coin_details.market_data?.circulating_supply
                        : "Not available"}
                    </p>
                    <p>
                      {coin_details.market_data?.total_supply
                        ? coin_details.market_data?.total_supply
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="box-2">
                {coin_chart.length > 0 ? (
                  <div>
                    MYR
                    <Chart options={chart_options} />
                  </div>
                ) : (
                  <p>NO DATA</p>
                )}
              </div>
            </div>
          </>
        )}
      </Paper>
    </Dialog>
  );
};

export default observer(Modal);
