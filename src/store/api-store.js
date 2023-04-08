import { makeObservable, action, observable } from "mobx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export class apiStoreImplementation {
  coin_list = [];
  coin_details = {};
  favourite_data = [];
  SEVEN_DAYS = 604800;
  chart_data = [];

  constructor() {
    makeObservable(this, {
      coin_list: observable,
      fetchList: action.bound,
      fetchDetails: action.bound,
    });
  }

  fetchList() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        // console.log(res.data, "store")
        this.coin_list = res.data;
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.message);
      });
  }

  clearDetails() {
    this.coin_details = {};
  }

  fetchDetails(coin_id) {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin_id}`)
      .then((res) => {
        // console.log(res.data, "store")
        this.coin_details = res.data;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  fetchChart() {
    const time = Date.now();
    const from = time - this.SEVEN_DAYS;

    axios
      .get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=myr&from=${from}&to=${time}
      `)
      .then((res) => {
        // console.log(res.data, "store")
        this.chart_data = res.data.prices;
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }


}

const apiStore = new apiStoreImplementation();

export default apiStore;
