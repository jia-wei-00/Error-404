import { makeObservable, action, observable } from "mobx";


export class apiStore {
    coin_list = {};

    constructor() {
        makeObservable(this, {
            coin_list: observable,

        })
    }

    fetchList() {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en').then((res) => {
            this.coin_list = res.data;
        }).catch((err) => {
            console.log(err);
        })
    }
}