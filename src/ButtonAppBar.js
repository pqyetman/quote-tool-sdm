import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

/* Add basic styling for NavLinks */
const linkStyles = {
  display: "inline-block",
  textDecoration: "none",
  color: "white",
};

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>  

          <NavLink to="/" style={linkStyles}>
            <Button color="inherit">Log In</Button>
          </NavLink>

          <NavLink to="/home" style={linkStyles}>
            <Button color="inherit">Home</Button>
          </NavLink>

          <NavLink to="/employeeusagecalculator" style={linkStyles}>
            <Button color="inherit">Employee Usage</Button>
          </NavLink>

          <NavLink to="/quotingtool" style={linkStyles}>
            <Button color="inherit">Quoting Tool</Button>
          </NavLink>

          <NavLink to="/calendar" style={linkStyles}>
            <Button color="inherit">Calendar</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
