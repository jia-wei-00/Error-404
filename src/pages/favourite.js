import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import "../styles/pages/favourite.scss";
import { authStore, fireStore, apiStore } from "../store";
import { observer } from "mobx-react-lite";
import { Wrapper } from "../components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import ToggleButton from "@mui/material/ToggleButton";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Grow from "@mui/material/Grow";
import { Modal } from "../components";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Favourite = () => {
  const [search, setSearch] = React.useState("");
  const [coinId, setCoinId] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (authStore.user) {
      fireStore.fetchFavouriteList();
    }
  }, [fireStore.favourite_list.length]);

  const openModal = (id) => {
    setOpen(true);
    setCoinId(id);
    apiStore.clearDetails();
  };

  return (
    <Wrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Stack justifyContent="flex-end" alignItems="flex-end">
          <TextField
            className="crypto-search-field"
            id="standard-basic"
            label="Search"
            variant="standard"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            sx={{ margin: "15px 15px 5px 15px" }}
          />
        </Stack>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: "15px" }}>
          {fireStore.favourite_data &&
            fireStore.favourite_data
              .filter((coin) => coin.name.toLowerCase().includes(search))
              .map((favorite, key) => {
                return (
                  <Grow
                    in={favorite}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(favorite ? { timeout: key * 1000 } : {})}
                  >
                    <Grid xs={12} sm={6} md={3} key={key}>
                      <Card onClick={() => openModal(favorite.id)}>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              src={favorite.image}
                              aria-label="recipe"
                            >
                              R
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <ToggleButton
                                value="check"
                                selected={fireStore.favourite_list.includes(
                                  favorite.id
                                )}
                                onChange={(event) => {
                                  event.stopPropagation();
                                  fireStore.postFavouriteAPI(favorite.id);
                                }}
                                color="warning"
                                sx={{ borderRadius: "50%" }}
                                size="small"
                              >
                                <StarRoundedIcon />
                              </ToggleButton>
                            </IconButton>
                          }
                          title={favorite.name}
                          subheader={favorite.symbol}
                        />
                        <CardContent sx={{ textAlign: "center" }}>
                          <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid md={6}>
                              <Typography sx={{ fontWeight: "600" }}>
                                Market Rank:
                              </Typography>
                              <Typography paragraph>
                                {favorite.market_cap_rank}
                              </Typography>
                            </Grid>
                            <Grid md={6}>
                              <Typography sx={{ fontWeight: "600" }}>
                                Current Price:
                              </Typography>
                              <Typography paragraph>
                                {favorite.current_price}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grow>
                );
              })}
        </Grid>
      </Box>
      <Modal popup_index={coinId} open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default observer(Favourite);
