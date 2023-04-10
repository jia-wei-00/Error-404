import { makeObservable, action, observable } from "mobx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export class apiStoreImplementation {
  coin_list = [];
  coin_details = {};
  favourite_data = [];
  chart_data = [];

  constructor() {
    makeObservable(this, {
      coin_list: observable,
      coin_details: observable,
      chart_data: observable,
      fetchList: action.bound,
      clearDetails: action.bound,
      fetchDetails: action.bound,
      fetchChart: action.bound,
      setDetails: action.bound,
      setCoinLists: action.bound,
      setChartData: action.bound,
    });
  }

  setCoinLists(props) {
    this.coin_list = props;
  }
  setDetails(props) {
    this.coin_details = props;
  }
  setChartData(props) {
    this.chart_data = props;
  }

  setIsLoading(is_loading) {
    this.is_loading = is_loading;
  }

  fetchList() {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        // console.log(res.data, "store")
        this.setCoinLists(res.data);
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
        this.setDetails(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  fetchChart(coin_id) {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=myr&days=7&interval=hourly
      `
      )
      .then((res) => {
        this.setChartData(res.data.prices);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
}

const apiStore = new apiStoreImplementation();

export default apiStore;
