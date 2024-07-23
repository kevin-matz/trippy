import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Slider,
  Typography,
  Box,
  IconButton,
  CircularProgress
} from '@mui/material/';
import { ArrowBack } from "@mui/icons-material";
import BackgroundImage from "../components/BackgroundImage";
import WeatherCard from "../components/search/WeatherCard";
import HotelsCard from "../components/search/HotelsCard";
import WebcamsCard from "../components/search/WebcamsCard";
import ReviewsCard from "../components/search/ReviewsCard";
import WavyTitle from "../components/WavyTitle";
import GrillomatCard from "../components/search/GrillomatCard";

const Search = () => {
  const navigate = useNavigate();

  const [webcamRadius, setWebcamRadius] = useState(50);

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

  const [locationDetails, setLocationDetails] = useState(null);

  const fetchLocationDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('dest');
    
    if (!destination) {
      navigate("/?error=Bitte geben Sie ein Reiseziel ein.");
      return;
    }

    const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${destination}&locale=de`, {
      method: "get",
      headers: {
        "X-RapidAPI-Key": "295a32984amsh6adacc7b795d952p11cdaajsn4c20c1816196",
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
      }
    });

    if (!response.ok) {
      navigate("/?error=Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.");
      return;
    }

    const json = await response.json();

    const noLocationFound = json.length === 0;
    if (noLocationFound) {
      navigate("/?error=Es konnte kein passendes Reiseziel gefunden werden.");
      return;
    }
    
    const firstMatch = json[0];

    setLocationDetails({
      coords: {
        lat: firstMatch.latitude,
        lon: firstMatch.longitude
      },
      destId: firstMatch.dest_id,
      destType: firstMatch.dest_type,
      name: firstMatch.name
    });
  };

  useEffect(() => {
    fetchLocationDetails();
    fetchUserDetails();
  }, []);

  if (!locationDetails) {
    return (
      <>
        <BackgroundImage />
        <Paper elevation={24} sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Paper>
      </>
    );
  }

  return (
    <>
      <BackgroundImage />
      <div className='navbar'>
        <IconButton color="primary" sx={{ placeSelf: "flex-start" }} aria-label="back" onClick={() => navigate("/")}>
          <ArrowBack sx={{ fontSize: "42px" }} />
        </IconButton>
      </div>
      <WavyTitle title={locationDetails.name} top="12%" />
      <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", mb: 4, pb: 1, mt: "12%" }}>
        <WeatherCard coords={locationDetails.coords} />
      </Paper>
      <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", mb: 4, p: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Grill-O-Mat
        </Typography>
        <GrillomatCard coords={locationDetails.coords} />
      </Paper>
      <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", mb: 4, p: 4, width: "33%" }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Reviews
        </Typography>
        <ReviewsCard destination={locationDetails.name} userDetails={userDetails} />
      </Paper>
      <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", rowGap: 2, p: 4, mb: 4, width: "50%" }}>
        <Typography variant="h4" align="center">
          Webcams
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ placeSelf: "flex-start" }}>
            Radius
          </Typography>
          <Slider
            aria-label="Radius"
            defaultValue={50}
            getAriaValueText={value => `${value} km`}
            valueLabelDisplay="auto"
            valueLabelFormat={value => `${value} km`}
            step={10}
            min={10}
            max={500}
            onChangeCommitted={(_, value) => { setWebcamRadius(value) }}
          />
        </Box>
        <WebcamsCard coords={locationDetails.coords} radius={webcamRadius} />
      </Paper>
      <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", rowGap: 2, width: "50%", p: 2 }}>
        <Typography variant="h4" align="center">
          Hotels
        </Typography>
        <HotelsCard destinationId={locationDetails.destId} destinationType={locationDetails.destType} />
      </Paper>
    </>
  );
};

export default Search;