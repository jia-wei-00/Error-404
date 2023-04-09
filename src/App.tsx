import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Favourite, Login } from "./pages";
import { Nav, Modal } from "./components";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";
import Auth from "./auth";
import { authStore } from "./store";
import { observer } from "mobx-react-lite";
import Testing from "./components/testing";

function App() {
  return (
    <BrowserRouter>
      {/* {authStore.user && <Nav />} */}

      <Nav />

      {/* <Auth> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/testing" element={<Testing />} />
        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
      {/* </Auth> */}
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default observer(App);
