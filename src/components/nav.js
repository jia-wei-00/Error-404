import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { authStore } from "../store";
import { observer } from "mobx-react-lite";
import "../styles/components/nav.scss";
import LoginModal from "./login-modal";
import logo from "../Assets/image/logo.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "Favorite", path: "/favorite" },
];

const settings = ["Logout"];

function ResponsiveAppBar() {
  const [filteredPages, setFilteredPages] = React.useState([]);

  React.useEffect(() => {
    if (authStore.user) {
      setFilteredPages(pages);
    } else {
      setFilteredPages(pages.filter((page) => page.name !== "Favorite"));
    }
  }, [authStore.user]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className="header"
      position="static"
      sx={{
        position: "sticky",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(15px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              height: 45,
              width: 45,
              marginRight: "10px",
            }}
            alt="logo"
            src={logo}
          />
          <image sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CoinWatch
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {filteredPages.map(({ name, path }, key) => {
                return (
                  <MenuItem key={key} onClick={handleCloseNavMenu}>
                    <Link to={path} className="link">
                      <Typography textAlign="center">{name}</Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box
            component="img"
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              height: 40,
              width: 40,
              marginRight: "10px",
            }}
            alt="logo"
            src={logo}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CoinWatch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {filteredPages.map((page, key) => (
              <Button
                key={key}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={page.path}
                  className="link"
                  style={{ color: "white" }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {authStore.user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={authStore.user}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, key) => (
                    <MenuItem
                      key={key}
                      onClick={() => {
                        {
                          authStore.signOut();
                          handleCloseUserMenu();
                        }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => authStore.setLoginModal(true)}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      <LoginModal />
    </AppBar>
  );
}
export default observer(ResponsiveAppBar);
