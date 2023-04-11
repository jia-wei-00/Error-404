import { makeObservable, action, observable } from "mobx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../firebase";
import fireStore from "./firestore-store";

export class authStoreImplementation {
  user = null;
  username = null;
  login_modal = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      username: observable,
      login_modal: observable,
      setUser: action.bound,
      signInAPI: action.bound,
      signOut: action.bound,
      setLoginModal: action.bound,
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user.email);
      } else {
        this.setUser(null);
      }
    });
  }

  setUser(user) {
    this.user = user;
  }

  setUsername(username) {
    this.username = username;
  }

  setLoginModal(props) {
    this.login_modal = props;
  }

  signInAPI(email, password) {
    return new Promise((resolve, reject) => {
      const id = toast.loading("Please wait...");
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          toast.update(id, {
            render: "Welcome " + user.user.email,
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          this.setUser(user.user.email);
          resolve(true); // Resolve the Promise with a boolean value indicating success
        })
        .catch((error) => {
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
          reject(error.message); // Reject the Promise with the error message
        });
    });
  }

  googleSignIn() {
    return new Promise((resolve, reject) => {
      const id = toast.loading("Please wait...");
      auth
        .signInWithPopup(provider)
        .then((result) => {
          toast.update(id, {
            render: "Welcome " + result.user.displayName,
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          this.setUser(result.user.email);
          this.setUsername(result.user.displayName);
          resolve(true);
        })
        .catch((error) => {
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
          reject(error.message);
        });
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      const id = toast.loading("Please wait...");
      auth
        .signOut()
        .then(() => {
          toast.update(id, {
            render: "Successfully Logout",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          this.setUser(null);
          this.setUsername(null);
          fireStore.setFavouriteList(null);
          fireStore.setFavouriteData(null);
          resolve(true);
        })
        .catch((error) => {
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
          reject(error.message);
        });
    });
  }

  signUp(email, password) {
    return new Promise((resolve, reject) => {
      const id = toast.loading("Please wait...");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          toast.update(id, {
            render: `Welcome ${userCredential.user.email}`,
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          this.user = userCredential.user.email;
          resolve(true);
        })
        .catch((error) => {
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
          reject(error.message);
        });
    });
  }
}

const authStore = new authStoreImplementation();

export default authStore;
