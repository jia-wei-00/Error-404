import React, { useEffect, Dispatch, SetStateAction } from "react";
import "../styles/components/details-modal.scss";
import { observer } from "mobx-react-lite";
import { apiStore } from "../store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { AxisOptions, Chart } from "react-charts";

interface CoinDetails {
  name?: string;

  description?: {
    en?: string;
  };
  market_data?: {
    current_price?: {
      myr?: number;
    };
  };
  image?: {
    large?: string;
  };
}

interface ModalProps {
  popup_index: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ popup_index, open, setOpen }) => {
  useEffect(() => {
    // apiStore.fetchDetails(popup_index);
    // apiStore.fetchChart(popup_index);
  }, [popup_index]);

  const coin_details: CoinDetails = apiStore.coin_details || {};
  let coin_chart = apiStore.chart_data;
  // console.log(coin_details);
  // console.log(coin_chart);

  // ---------------------------------------------Chart---------------------------------------------
  // const time_stamp: number[] = [];
  // const price_data: number[] = [];
  // coin_chart = coin_chart.map((coin_chart_data: number[]) => {
  //   return {
  //     timestamp: coin_chart_data[0],
  //     price: coin_chart_data[1],
  //   };
  // });
  // coin_chart.forEach((coin_chart: { timestamp: number; price: number }) => {
  //   time_stamp.push(coin_chart.timestamp);
  //   price_data.push(coin_chart.price);
  // });

  // const data = {
  //   date: time_stamp,
  //   price: price_data
  // }
  // // const { data, randomizeData } = useDemoConfig({
  // //   series: 10,
  // //   dataType: "time",
  // // });

  // const primaryAxis = React.useMemo<
  //   AxisOptions<typeof data[number]["data"][number]>
  // >(
  //   () => ({
  //     getValue: (datum) => datum.primary as unknown as Date,
  //   }),
  //   []
  // );

  // const secondaryAxes = React.useMemo<
  //   AxisOptions<typeof data[number]["data"][number]>[]
  // >(
  //   () => [
  //     {
  //       getValue: (datum) => datum.secondary,
  //     },
  //   ],
  //   []
  // );
  // ---------------------------------------------Chart---------------------------------------------
  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      maxWidth="md"
      aria-labelledby="responsive-dialog-title"
    >
      <Paper sx={{ padding: "30px", textAlign: "center" }}>
        <div className="content">
          <div className="box-main">
            <div className="box-main-1">
              <img
                src={coin_details.image && coin_details.image.large}
                alt=""
                height={100}
              />
              <h1>{coin_details.name}</h1>
              <h2>
                Price: RM
                {coin_details.market_data &&
                  coin_details.market_data.current_price?.myr}
              </h2>
            </div>
            <div className="box-main-2">
              <p>{coin_details.description && coin_details.description.en}</p>
            </div>
          </div>
          <div className="box-1">
            <h2></h2>
          </div>
          <div className="box-2">
            CHART HERE
            {/* <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        /> */}
          </div>
        </div>
      </Paper>
    </Dialog>
  );
};

export default observer(Modal);
