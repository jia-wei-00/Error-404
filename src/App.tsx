import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Favourite, Login } from "./pages";
import { Nav, Modal } from "./components";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";
import Auth from "./auth";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Auth>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/" element={<Login />} />
          <Route path="/modal" element={<Modal />} />
        </Routes>
      </Auth>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
