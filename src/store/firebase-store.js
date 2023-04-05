import { makeObservable, action, observable } from "mobx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db, { auth, fieldValue } from "../firebase";
// import { sendPasswordResetEmail } from "firebase/auth";

export class firebaseStoreImplementation {
  user = "";

  constructor() {
    makeObservable(this, {
      user: observable,
      getUserAuth: action.bound,
    });
  }

  getUserAuth() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      }
    });

  }

  signInAPI(data) {
    const id = toast.loading("Please wait...");
    auth
      .signInWithEmailAndPassword(data.username, data.password)
      .then((auth) => {
        toast.update(id, {
          render: "Welcome " + auth.user.email,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });

        this.user = auth.user;
      })
      .catch((error) => {
        toast.update(id, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

}

const firebaseStore = new firebaseStoreImplementation();

export default firebaseStore;
