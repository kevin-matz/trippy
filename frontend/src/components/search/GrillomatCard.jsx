import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress
} from '@mui/material/';
import PropTypes from 'prop-types';
import happySmiley from '../../assets/happy_smiley.svg';
import sadSmiley from '../../assets/sad_smiley.svg';

const GrillomatCard = (props) => {
  const [grillomatData, setGrillomatData] = useState(null);

  const fetchGrillomatData = async () => {
    const response = await fetch(`http://194.94.204.27:20023/grillomat?lat=${props.coords.lat}&lon=${props.coords.lon}`);
    if (!response.ok) {
      setGrillomatData(false);
    }
    const json = await response.json();
    setGrillomatData(json.data);
  };

  useEffect(() => {
    fetchGrillomatData();
  }, []);

  if (grillomatData === null) {
    return <CircularProgress sx={{ placeSelf: "center", m: 3 }} />;
  }

  if (grillomatData === false) {
    return <Typography>Da ist etwas schiefgelaufen...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 2 }}>
      {
        grillomatData.grillable ?
        <>
          <img src={happySmiley} alt="Fröhlicher Smiley" style={{ maxWidth: 100 }} />
          <Typography>
            Fröhliches Grillen!
          </Typography>
        </>
      :
        <>
          <img src={sadSmiley} alt="Trauriger Smiley" style={{ maxWidth: 100 }} />
          <Typography>
            Hier kann leider nicht gegrillt werden...
          </Typography>
        </>
      }
    </Box>
  );
};

GrillomatCard.propTypes = {
  coords: PropTypes.object
};

export default GrillomatCard;