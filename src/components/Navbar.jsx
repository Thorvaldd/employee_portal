import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Company Management
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/employees" sx={{ textTransform: 'none' }}>
          Employees
        </Button>
        <Button color="inherit" component={Link} to="/salary" sx={{ textTransform: 'none' }}>
          Salary Reports
        </Button>
      </Toolbar>
    </AppBar>
  );
export default Navbar;