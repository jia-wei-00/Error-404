import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Favourite, Login, NotFound } from "./pages";
import { Nav, Modal } from "./components";
import { ToastContainer } from "react-toastify";
import "./styles/main.scss";
import Auth from "./auth";
import { authStore } from "./store";
import { observer } from "mobx-react-lite";
import Testing from "./components/testing";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./components/nav";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#3B3B3B",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveAppBar />

        {/* <Auth> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favourite />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </Auth> */}
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default observer(App);
