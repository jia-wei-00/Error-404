import { makeObservable, action, observable } from "mobx";
import axios from "axios";

export class apiStoreImplementation {
  coin_list = [];
  coin_details = {};

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
        console.log(err);
      });
  }

  fetchDetails(id) {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      )
      .then((res) => {
        // console.log(res.data, "store")
        this.coin_details = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const apiStore = new apiStoreImplementation();

export default apiStore;
