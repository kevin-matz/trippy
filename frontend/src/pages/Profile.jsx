import * as React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import AccountDetailsPage from './AccountDetails.jsx';
import ReviewsPage from './Reviews.jsx';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import {
  Person,
  Textsms,
  Logout,
  Home
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = React.useState(null);

  const fetchUserDetails = async () => {
    const response = await fetch("/api/users/status", {
      credentials: "include"
    });
    if (response.status !== 200) {
      setUserDetails(false);
      console.error("Ein Fehler ist während einer Anfrage aufgetreten.");
    }

    const json = await response.json();
    if (!json.data.result) {
      setUserDetails(false);
      return; 
    }

    setUserDetails(json.data.result);
  };

  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  const drawerWidth = 240;
  let [currentPage, setCurrentPage] = React.useState('AccountDetails');

  function handleClickReviews() {
    setCurrentPage('Reviews');
  }

  function handleClickAccount() {
    setCurrentPage('AccountDetails');
  }

  const handleLogout = async () => {
    const response = await fetch("/api/users/logout", {
      credentials: "include"
    });
    if (response.status !== 200) {
      alert("Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.");
      return;
    }

    navigate("/?success=Logout erfolgreich!");
  };

  /* When trying to access this page while not logged in, redirect to 404 page */
  if (userDetails === false) {
    navigate("/404");
  }

  return (
    <>
      <BackgroundImage />
      <Box sx={{ display: 'flex', width: "100%" }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" noWrap component="div">
              {userDetails && `Willkommen, ${userDetails.username}!`}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 1, alignItems: "center", marginLeft: "auto" }}>
              <Button sx={{ color: "#fff" }} variant="text" endIcon={<Home />} onClick={() => navigate("/")}>
                Home
              </Button>
              <Button sx={{ color: "#fff" }} variant="text" endIcon={<Logout />} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleClickAccount}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary='Account' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleClickReviews}>
                  <ListItemIcon>
                    <Textsms />
                  </ListItemIcon>
                  <ListItemText primary='Reviews' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, p: 3 }}>
          {currentPage === 'AccountDetails' && <AccountDetailsPage />}
          {currentPage === 'Reviews' && <ReviewsPage />}
        </Box>
      </Box>
    </>
  );
}

export default Profile;