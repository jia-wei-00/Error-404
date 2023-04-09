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
      coin_details: observable,
      chart_data: observable,
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
    this.chart_data = [];
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

  fetchChart(coin_id) {
    
    let time = Date.now();
    time = time - 500;
    const from = time - this.SEVEN_DAYS;
  

    axios
      .get(
      // `https://api.coingecko.com/api/v3/coins/usd-coin/market_chart/range?vs_currency=myr&from=1680399557&to=1681004357`
      `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=myr&days=7&interval=hourly`
      )
      .then((res) => {
        this.chart_data = (res.data.prices);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
}

const apiStore = new apiStoreImplementation();

export default apiStore;
