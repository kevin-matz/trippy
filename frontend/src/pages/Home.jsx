import BackgroundImage from '../components/BackgroundImage';
import WavyTitle from '../components/WavyTitle';
import Statistics from '../components/home/Statistics';
import {
  TextField,
  Button,
  IconButton,
  Paper,
  Box,
  Typography,
  Snackbar
} from '@mui/material/';
import MuiAlert from '@mui/material/Alert';
import {
  FlightTakeoff,
  AccountCircle
} from '@mui/icons-material/';
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    const response = await fetch("/api/users/status", {
      credentials: "include"
    });
    if (response.status !== 200) {
      setUserDetails(false);
      console.error("Ein Fehler ist während einer Anfrage aufgetreten.");
      return;
    }

    const json = await response.json();
    if (!json.data.result) {
      setUserDetails(false);
      return; 
    }

    setUserDetails(json.data.result);
  };

  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUserDetails();
    const urlParams = new URLSearchParams(window.location.search);
    const successMsg = urlParams.get('success');
    if (successMsg) {
      setSuccessMessage(successMsg);
      setSuccessOpen(true);
    }
    const errorMsg = urlParams.get('error');
    if (errorMsg) {
      setErrorMessage(errorMsg);
      setErrorOpen(true);
    }
  }, []);

  const handleSuccessClose = (_, reason) => {
    if (reason === 'clickaway')
      return;

    setSuccessOpen(false);
  };

  const handleErrorClose = (_, reason) => {
    if (reason === 'clickaway')
      return;

    setErrorOpen(false);
  };

  const searchFieldRef = useRef(null);

  const handleKeyDown = (event) => {
    const key = event.key;
    if (key !== "Enter")
      return;

    handleSearch();
  };

  const handleSearch = () => {
    navigate(`/search?dest=${searchFieldRef.current.value}`);
  };

  return (
    <>
      <BackgroundImage />
      <div className='navbar'>
        <Box sx={{ placeSelf: "flex-end", display: "flex", flexDirection: "row", alignItems: "center", columnGap: 2 }}>
          {
            userDetails &&
            <Typography sx={{ textShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}>
              {userDetails.username}
            </Typography>
          }
          {
            userDetails ?
            <IconButton color="primary" aria-label="profile" onClick={() => navigate("/profile")}>
              <AccountCircle sx={{ fontSize: "42px" }} />
            </IconButton>
            :
            <IconButton color="primary" aria-label="account" onClick={() => navigate("/account")}>
              <AccountCircle sx={{ fontSize: "42px" }} />
            </IconButton>
          }
        </Box>
      </div>
      <WavyTitle title="Trippy" top="22%" />
      <Paper elevation={24} sx={{ borderRadius: 3, width: "33%", p: 2, mt: "7%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <TextField inputRef={searchFieldRef} onKeyDown={handleKeyDown} label="Wo soll&apos;s hingehen?" variant="filled" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleSearch} variant="contained" endIcon={<FlightTakeoff/>}>Los geht&apos;s!</Button>
        </Box>
      </Paper>
      <Statistics />
      <Snackbar open={successOpen} autoHideDuration={5000} onClose={handleSuccessClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleErrorClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;