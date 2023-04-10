import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "./details-modal.tsx";
import "./details-modal.tsx";
import { apiStore, authStore, fireStore } from "../store";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import "../styles/pages/home.scss";
import { observer } from "mobx-react-lite";
import { reaction, when } from "mobx";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  { id: "favorite", label: "", width: 2, align: "left" },
  { id: "rank", label: "#", width: 10, align: "left" },
  { id: "coin", label: "Coin", width: 10 },
  {
    id: "price",
    label: "Price",
    width: 10,
    align: "left",
  },
  {
    id: "OneDay",
    label: "24h",
    width: 10,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DailyMktCapDiff",
    label: "Daily Mkt Cap Changes",
    width: 10,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "ath-changes",
    label: "All-Time High Changes",
    width: 10,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "atl-changes",
    label: "All-Time Low Changes",
    width: 10,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

const StickyHeadTable = ({ search }) => {
  const [load, setLoad] = useState(20);
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState("");

  useEffect(() => {
    if (authStore.user) {
      fireStore.fetchFavouriteList();
      console.log(fireStore.favourite_list);
    }

    // if (apiStore.coin_list.length > 0 && authStore.user) {
    //   const disposeReaction = reaction(
    //     () => !fireStore.favourite_list,
    //     () => fireStore.fetchFavouriteList(),

    //   );

    //   return () => {
    //     disposeReaction();
    //   }
    // }


  }, [authStore.user]);

  const loading = () => {
    if (load < 100) {
      setLoad(load + 20);
    }
  };

  const favorite = (event, id) => {
    event.stopPropagation();
    if (!authStore.user) {
      authStore.setLoginModal(true);
    } else {
      fireStore.postFavouriteAPI(id);
    }
    console.log(fireStore.postFavouriteAPI)
  };

  const openModal = (id) => {
    setOpen(true);
    setCoinId(id);
    apiStore.clearDetails();
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer className="table" sx={{ overflow: "auto" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      width: column.width,
                      position: "sticky",
                      top: "0",
                      zIndex: 1,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {apiStore.coin_list.length > 0 &&
                apiStore.coin_list
                  .filter((coin) => coin.name.toLowerCase().includes(search))
                  .slice(4, load)
                  .map((coin, key) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={key}
                        onClick={() => openModal(coin.id)}
                      >
                        <TableCell>
                          {fireStore.favourite_list && 
                            fireStore.favourite_list.includes(coin.id) ? (
                            <StarRateRoundedIcon
                              className="star"
                              onClick={(event) => favorite(event, coin.id)}
                            />
                          ) : (
                            <StarBorderRoundedIcon
                              onClick={(event) => favorite(event, coin.id)}
                            />
                          )}
                        </TableCell>

                        <TableCell>{coin.market_cap_rank}</TableCell>
                        <TableCell>
                          <div className="cell">
                            <div>
                              <img className="cell-images" src={coin.image} />
                            </div>
                            <div className="d-flex cell-text">
                              {coin.name}  <p>{coin.symbol}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{coin.current_price}</TableCell>
                        <TableCell>
                          <div
                            className={`my-number ${coin.price_change_percentage_24h < 0
                              ? "negative"
                              : ""
                              }`}
                          >
                            {coin.price_change_percentage_24h.toFixed(2) + "%"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`my-number ${coin.market_cap_change_percentage_24h < 0
                              ? "negative"
                              : ""
                              }`}
                          >
                            {coin.market_cap_change_percentage_24h.toFixed(2) +
                              "%"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`my-number ${coin.ath_change_percentage < 0 ? "negative" : ""
                              }`}
                          >
                            {coin.ath_change_percentage.toFixed(2) + "%"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`my-number ${coin.atl_change_percentage < 0 ? "negative" : ""
                              }`}
                          >
                            {coin.atl_change_percentage.toFixed(2) + "%"}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {load <
        apiStore.coin_list.filter((coin) =>
          coin.name.toLowerCase().includes(search)
        ).length && (
          <Button
            variant="contained"
            sx={{
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "black",
              marginTop: 3,
              ":hover": {
                backgroundColor: "#fc6",
                color: "black",
              },
            }}
            onClick={() => loading()}
          >
            Load More
          </Button>
        )}

      <Modal popup_index={coinId} open={open} setOpen={setOpen} />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiStore.coin_list.length === 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default observer(StickyHeadTable);
