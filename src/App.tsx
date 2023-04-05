import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Favourite, Login } from "./pages";
import { Nav, Modal } from "./components";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/" element={<Login />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
