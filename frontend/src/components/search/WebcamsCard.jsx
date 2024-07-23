import React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress
} from '@mui/material/';
import WindyWebcam from "./WindyWebcam";
import PropTypes from 'prop-types';

const WebcamsCard = (props) => {
  const [webcamData, setWebcamData] = useState(null);

  const fetchWebcamData = async () => {
    setWebcamData(null);

    if (props.coords === null)
      return;

    const response = await fetch(`https://api.windy.com/api/webcams/v2/list/nearby=${props.coords.lat},${props.coords.lon},${props.radius}?show=webcams`, {
        headers: {
            "x-windy-key": "o0dr08QduZP3mETXkjSLuuqRmsXIPEjR"
        }
    });
    const json = await response.json();
    setWebcamData(json);
  };

  useEffect(() => {
    fetchWebcamData();
  }, [props.coords, props.radius]);

  if (webcamData === null) {
    return <CircularProgress sx={{ placeSelf: "center" }} />;
  }

  return webcamData.result.webcams.map((cam) => (
    /* div is necessary: https://stackoverflow.com/questions/54880669/react-domexception-failed-to-execute-removechild-on-node-the-node-to-be-re */
    <div key={cam.id}>
      <Typography>{cam.title}</Typography>
      <WindyWebcam id={cam.id} title={cam.title} />
    </div>
  ));
};

WebcamsCard.propTypes = {
  coords: PropTypes.object,
  radius: PropTypes.number.isRequired
};

export default WebcamsCard;