import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { apiStore } from "../store";
import "../styles/pages/home.scss";

const columns = [
  { id: "rank", label: "#", minWidth: 10 },
  { id: "coin", label: "Coin", minWidth: 50 },
  {
    id: "price",
    label: "Price",
    minWidth: 20,
    align: "right",
  },
  {
    id: "OneDay",
    label: "24h",
    minWidth: 20,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "DailyMktCapDiff",
    label: "Daily Mkt Cap Changes",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "ath-changes",
    label: "All-Time High Changes",
    minWidth: 20,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "atl-changes",
    label: "All-Time Low Changes",
    minWidth: 20,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(0);

  React.useEffect(() => {
    apiStore.fetchList();
  }, []);

  console.log(apiStore.coin_list);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                    minWidth: column.minWidth,
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
            {apiStore.coin_list.slice(4,100).map((coin, key) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={key} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}

                  <TableCell>{coin.market_cap_rank}</TableCell>
                  <TableCell>
                    <div className="cell">
                      <div>
                        <img className="cell-images" src={coin.image} />
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
                        coin.price_change_percentage_24h < 0 ? "negative" : ""
                      }`}
                    >
                      {`${coin.price_change_percentage_24h.toFixed(2)}%`}
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
                      {`${coin.market_cap_change_percentage_24h.toFixed(2)}%`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`my-number ${
                        coin.ath_change_percentage< 0
                          ? "negative"
                          : ""
                      }`}
                    >
                      {`${coin.ath_change_percentage.toFixed(2)}%`}
                    </div>
                  </TableCell>
                  <TableCell>
                      <div className={`my-number ${coin.atl_change_percentage < 0 ? 'negative': ''}`}>
                        {`${coin.atl_change_percentage.toFixed(2)}%`}
                        </div>
                        </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

<div>
  {apiStore.coin_list.length > 0 ? (
    apiStore.coin_list.map((coin, key) => {
      return (
        <li key={key}>
          {coin.name} {coin.atl_date}
        </li>
      );
    })
  ) : (
    <li>Loading</li>
  )}
</div>;
