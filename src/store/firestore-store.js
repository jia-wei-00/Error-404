import { makeObservable, action, observable } from "mobx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "../firebase";
import authStore from "./auth-store";
import apiStore from "./api-store";

export class firestoreStoreImplementation {
  favourite_list = [];
  favourite_data = [];

  constructor() {
    makeObservable(this, {
      favourite_list: observable,
      favourite_data: observable,
      postFavouriteAPI: action.bound,
      fetchFavouriteList: action.bound,
      getFavouriteList: action.bound,
      setFavouriteList: action.bound,
    });
  }

  setFavouriteList(props) {
    this.favourite_list = props;
  }

  postFavouriteAPI(props) {
    let tmp_favorite_list = [...this.favourite_list];
    const id = toast.loading("Please wait...");

    if (props) {
      if (tmp_favorite_list.includes(props)) {
        tmp_favorite_list.splice(tmp_favorite_list.indexOf(props), 1);
        console.log(tmp_favorite_list);
      } else {
        tmp_favorite_list.push(props);
      }

      const email = authStore.user;
      const docRef = db.collection("user_data").doc(email);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document exists!");
            docRef
              .update({
                favourite_list: tmp_favorite_list,
              })
              .then(() => {
                this.setFavouriteList(tmp_favorite_list);
                toast.update(id, {
                  render: "Favorite Updated",
                  type: "success",
                  isLoading: false,
                  autoClose: 5000,
                });
              })
              .catch((error) => {
                console.log("Error updating document:", error);
                toast.update(id, {
                  render: error.message,
                  type: "error",
                  isLoading: false,
                  autoClose: 5000,
                });
              });
          } else {
            console.log("Document does not exist!");
            docRef
              .set({
                favourite_list: tmp_favorite_list,
              })
              .then(() => {
                this.setFavouriteList(tmp_favorite_list);
                console.log("Document created successfully!");
              })
              .catch((error) => {
                console.log("Error creating document:", error);
                toast.error(error.message);
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }

  fetchFavouriteList() {
    const email = authStore.user;
    const docRef = db.collection("user_data").doc(email);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setFavouriteList(doc.data().favourite_list);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  getFavouriteList() {
    const newArray = apiStore.coin_list
      .filter((item) => this.favourite_list.includes(item.id))
      .map((item) => ({
        ...item,
      }));
    console.log('here', newArray);
    this.favourite_data = newArray;
  }
}

const fireStore = new firestoreStoreImplementation();

export default fireStore;
