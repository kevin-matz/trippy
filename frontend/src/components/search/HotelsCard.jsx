import React from "react";
import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Rating,
  CircularProgress
} from '@mui/material/';
import PropTypes from 'prop-types';

const HotelsCard = (props) => {
  const [hotelData, setHotelData] = useState(null);

  const fetchHotelData = async () => {
    const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=2023-09-27&checkout_date=2023-09-28&dest_type=${props.destinationType}&units=metric&adults_number=2&order_by=popularity&dest_id=${props.destinationId}&filter_by_currency=EUR&locale=de&room_number=1`, {
      method: "get",
      headers: {
          "X-RapidAPI-Key": "295a32984amsh6adacc7b795d952p11cdaajsn4c20c1816196",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
      }
    });
    const json = await response.json();
    setHotelData(json);
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  if (hotelData === null) {
    return <CircularProgress sx={{ placeSelf: "center" }} />;
  }

  return hotelData.result.map((result, idx) => (
    <React.Fragment key={idx}>
      <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
        <img style={{ maxWidth: "20%", borderRadius: 8 }} src={result.max_1440_photo_url} alt={result.hotel_name} />
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h5">
            {result.hotel_name}
          </Typography>
          <Typography variant="subtitle1">
            {result.address}, {result.zip} {result.city}
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {result.district}
          </Typography>
          <Typography>
            Booking Bewertung:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
            <Rating max={10} defaultValue={0} value={result.review_score} precision={0.1} readOnly />
            <Typography>
              {result.review_score_word} ({result.review_nr} Bewertungen)
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Only add Divider element if its not at the last place (we dont want a divider at the end of the list) */}
      {idx !== hotelData.result.length - 1 && <Divider />}
    </React.Fragment>
  ));
};

HotelsCard.propTypes = {
  destinationId: PropTypes.string.isRequired,
  destinationType: PropTypes.string.isRequired
};

export default HotelsCard;