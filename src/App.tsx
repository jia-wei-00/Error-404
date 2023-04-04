import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Favourite, Login } from "./pages";
import {Nav, Modal} from "./components";

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
    </BrowserRouter>
  );
}

export default App;
