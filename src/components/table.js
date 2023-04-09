import React, { useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Popup from "reactjs-popup";
import Modal from "./details-modal.js";
import "./details-modal.js";
import { apiStore } from "../store";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import "../styles/pages/home.scss";
import { fireStore } from "../store";
import { observer } from "mobx-react-lite";

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
  useEffect(() => {
    if (apiStore.coin_list.length > 0) {
      fireStore.fetchFavouriteList();
    }
  }, [fireStore.favourite_list]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
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
                .slice(4, 100)
                .map((coin, key) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                      <TableCell>
                        {fireStore.favourite_list &&
                        fireStore.favourite_list.includes(coin.id) ? (
                          <StarRateRoundedIcon
                            onClick={() => fireStore.postFavouriteAPI(coin.id)}
                            className="star"
                          />
                        ) : (
                          <StarBorderRoundedIcon
                            onClick={() => fireStore.postFavouriteAPI(coin.id)}
                          />
                        )}
                      </TableCell>
                      <TableCell>{coin.market_cap_rank}</TableCell>
                      <Popup
                        trigger={
                          <>
                            <TableCell>
                              <div className="cell">
                                <div>
                                  <img
                                    className="cell-images"
                                    src={coin.image}
                                  />
                                </div>
                                <div className="d-flex cell-text">
                                  {coin.name} + {coin.symbol}
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
                                  coin.ath_change_percentage < 0
                                    ? "negative"
                                    : ""
                                }`}
                              >
                                {coin.ath_change_percentage.toFixed(2) + "%"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className={`my-number ${
                                  coin.atl_change_percentage < 0
                                    ? "negative"
                                    : ""
                                }`}
                              >
                                {coin.atl_change_percentage.toFixed(2) + "%"}
                              </div>
                            </TableCell>
                          </>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <button
                              className="close"
                              onClick={(apiStore.clearDetails(), close)}
                            >
                              &times;
                            </button>
                            <Modal popup_index={coin.id} />
                          </div> 
                        )}
                      </Popup>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default observer(StickyHeadTable);
