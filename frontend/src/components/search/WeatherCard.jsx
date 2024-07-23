import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress
} from '@mui/material/';
import PropTypes from 'prop-types';

const WeatherCard = (props) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coords.lat}&lon=${props.coords.lon}&units=metric&lang=de&appid=a8caba1b867066d292d1c06a994535bc`);
    const json = await response.json();
    setWeatherData(json);
  };

  useEffect(() => {
    if (props.coords === null)
      return;

    fetchWeatherData();
  }, [props.coords]);

  if (weatherData === null) {
    return <CircularProgress sx={{ placeSelf: "center", m: 3 }} />;
  }

  const temperature = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  const weatherIconCode = weatherData.weather[0].icon;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`} alt="Wettersymbol" style={{ objectFit: "contain", filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))" }} />
        <Typography variant="h4" color="#666" sx={{ pr: 3 }}>
          {temperature.toFixed(1)} °C
        </Typography>
      </Box>
      <Typography variant="h6" align="center" sx={{ mt: -2 }}>
        {weatherDescription}
      </Typography>
    </>
  );
};

WeatherCard.propTypes = {
  coords: PropTypes.object
};

export default WeatherCard;