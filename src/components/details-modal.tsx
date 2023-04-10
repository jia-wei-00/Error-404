import React, { useEffect, Dispatch, SetStateAction } from "react";
import "../styles/components/details-modal.scss";
import { observer } from "mobx-react-lite";
import { apiStore } from "../store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { AxisOptions, Chart, ChartOptions } from "react-charts";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

interface CoinDetails {
  name?: string;
  description?: { en?: string };
  image?: { large?: string };
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
}

interface ModalProps {
  popup_index: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type MyDatum = { timestamp: Date; price: number };

const Modal: React.FC<ModalProps> = ({ popup_index, open, setOpen }) => {
  useEffect(() => {
    if(popup_index) {
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
      label: "Crypto",
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

  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xl"
    >
      <Paper className="modal" sx={{ padding: "1rem", position: "relative" }}>
        {coin_details && coin_chart.length === 0 ? (
          <div className="loading">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              alt="Loading..."
            ></img>
          </div>
        ) : (
          <>
            <div className="modal-close">
              <button onClick={handleClose}>✕</button>
            </div>
            <div className="content">
              <div className="box-main">
                <div className="box-main-1">
                  <img
                    src={coin_details.image && coin_details.image.large}
                    alt=""
                    height={200}
                  />
                  <h1>{coin_details.name}</h1>
                  <h2>
                    Price: RM
                    {coin_details.market_data &&
                      coin_details.market_data.current_price?.myr}
                  </h2>
                </div>
                <div className="box-main-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: dangerous_html }}
                  ></div>
                </div>
                <div className="box-main-3">
                  <div>
                    <p>All-Time High: {coin_details.market_data?.ath?.myr}</p>
                  </div>
                  <div>
                    <p>All-Time Low: {coin_details.market_data?.atl?.myr}</p>
                  </div>
                </div>
              </div>
              <div className="box-1">
                <div className="box-flex-1">
                  <h3>Market Cap:</h3>
                  <h3>Circulating Supply:</h3>
                  <h3>Total Supply:</h3>
                  <h3>Fully Diluted Valuation:</h3>
                  <h3>Total Volume:</h3>
                </div>
                <div className="box-flex-2">
                  <div>
                    <h3>RM{coin_details.market_data?.market_cap?.myr}</h3>
                    <h3>{coin_details.market_data?.circulating_supply}</h3>
                    <h3>{coin_details.market_data?.total_supply}</h3>
                    <h3>
                      RM{coin_details.market_data?.fully_diluted_valuation?.myr}
                    </h3>
                    <h3>RM{coin_details.market_data?.total_volume?.myr}</h3>
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
