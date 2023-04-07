import { makeObservable, action, observable } from "mobx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../firebase";

// import { sendPasswordResetEmail } from "firebase/auth";

export class authStoreImplementation {
  user = null;
  username = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action.bound,
      signInAPI: action.bound,
      signOut: action.bound,
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

  signInAPI(email, password) {
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

  googleSignIn() {
    const id = toast.loading("Please wait...");
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // User signed in successfully, handle the result object
        toast.update(id, {
          render: "Welcome " + result.user.displayName,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        this.setUser(result.user.email);
        this.setUsername(result.user.displayName);
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

  signOut() {
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

  signUp(email, password) {
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

const authStore = new authStoreImplementation();

export default authStore;
