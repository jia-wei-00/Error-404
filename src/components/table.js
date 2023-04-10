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
import "../styles/pages/home.scss";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { TransitionGroup } from "react-transition-group";
import { Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

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

const StickyHeadTable = ({ search, slice }) => {
  const [load, setLoad] = useState(20);
  const [open, setOpen] = useState(false);
  const [coinId, setCoinId] = useState("");

  useEffect(() => {
    if (authStore.user) {
      fireStore.fetchFavouriteList();
    }
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
  };

  const openModal = (id) => {
    setOpen(true);
    setCoinId(id);
    apiStore.clearDetails();
  };

  console.log(apiStore.coin_list);
  return (
    <>
      <Paper sx={{ width: "100%", margin: "0 0 30px 0" }}>
        <TableContainer className="table" sx={{ overflow: "auto" }}>
          <TransitionGroup>
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
              <TableBody className="tablebody">
                {apiStore.coin_list.length > 0 &&
                  apiStore.coin_list
                    .filter((coin) => coin.name.toLowerCase().includes(search))
                    .slice(slice, load)
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
                            <ToggleButton
                              value="check"
                              selected={
                                fireStore.favourite_list &&
                                fireStore.favourite_list.includes(coin.id)
                              }
                              onChange={(event) => {
                                favorite(event, coin.id);
                              }}
                              color="warning"
                              sx={{ borderRadius: "50%" }}
                              size="small"
                            >
                              <StarRoundedIcon />
                            </ToggleButton>
                          </TableCell>

                          <TableCell>{coin.market_cap_rank}</TableCell>
                          <TableCell>
                            <div className="cell">
                              <div>
                                <img className="cell-images" src={coin.image} />
                              </div>
                              <div className="d-flex cell-text">
                                {coin.name} <p>{coin.symbol}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{coin.current_price}</TableCell>
                          <TableCell>
                            <div
                              className={`my-number ${
                                coin.price_change_percentage_24h < 0
                                  ? "negative"
                                  : ""
                              }`}
                            >
                              {coin.price_change_percentage_24h.toFixed(2) +
                                "%"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`my-number ${
                                coin.market_cap_change_percentage_24h < 0
                                  ? "negative"
                                  : ""
                              }`}
                            >
                              {coin.market_cap_change_percentage_24h.toFixed(
                                2
                              ) + "%"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`my-number ${
                                coin.ath_change_percentage < 0 ? "negative" : ""
                              }`}
                            >
                              {coin.ath_change_percentage.toFixed(2) + "%"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`my-number ${
                                coin.atl_change_percentage < 0 ? "negative" : ""
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
          </TransitionGroup>
        </TableContainer>
      </Paper>
      {load <
        apiStore.coin_list.filter((coin) =>
          coin.name.toLowerCase().includes(search)
        ).length && (
        <Stack alignItems="center">
          <Button
            variant="contained"
            sx={{
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "black",
              margin: 3,
              ":hover": {
                backgroundColor: "#fc6",
                color: "black",
              },
            }}
            onClick={() => loading()}
          >
            Load More
          </Button>
        </Stack>
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
