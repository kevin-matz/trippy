import {
  Paper,
  Box,
  Typography,
} from '@mui/material/';
import {
  Leaderboard,
  Star,
  StarHalf,
  People,
  Reviews
} from '@mui/icons-material/';
import { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

const StatisticsCard = (props) => {
  return (
    <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 1, p: 2, minWidth: "250px" }}>
      <Fragment>
        { props.children }
      </Fragment>
    </Paper>
  );
}

StatisticsCard.propTypes = {
  children: PropTypes.node
};

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState(null);

  const fetchSiteStatistics = async () => {
    let response = await fetch("/api/statistics/usercount");
    let json = await response.json();
    const userCount = json.data.result;

    if (!userCount) {
      setStatisticsData(false);
      console.warn("Not enough data to display statistics.");
      return;
    }

    response = await fetch("/api/statistics/reviewcount");
    json = await response.json();
    const reviewCount = json.data.result;

    if (!reviewCount) {
      setStatisticsData(false);
      console.warn("Not enough data to display statistics.");
      return;
    }

    response = await fetch("/api/statistics/mostreviewedplace");
    json = await response.json();
    const mostReviewedPlace = json.data.result.destination;
    const mostReviewedPlaceCount = json.data.result.count;
    response = await fetch("/api/statistics/bestratedplace");
    json = await response.json();
    const bestRatedPlace = json.data.result.destination;
    const bestRatedPlaceRating = json.data.result.average_rating;
    response = await fetch("/api/statistics/averagerating");
    json = await response.json();
    const averageRating = json.data.result;

    setStatisticsData({
      userCount: userCount,
      reviewCount: reviewCount,
      mostReviewedPlace: mostReviewedPlace,
      mostReviewedPlaceCount: mostReviewedPlaceCount,
      bestRatedPlace: bestRatedPlace,
      bestRatedPlaceRating: bestRatedPlaceRating,
      averageRating: averageRating
    });
  };

  useEffect(() => {
    fetchSiteStatistics();
  }, []);

  if (!statisticsData)
    return;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", columnGap: 4, rowGap: 2, justifyContent: "center", mt: 6, maxWidth: "60%" }}>
      <StatisticsCard>
        <People sx={{ fontSize: 32 }} />
        <Typography>
          Nutzer: {statisticsData.userCount}
        </Typography>
      </StatisticsCard>
      <StatisticsCard>
        <Reviews sx={{ fontSize: 32 }} />
        <Typography>
          Reviews: {statisticsData.reviewCount}
        </Typography>
      </StatisticsCard>
      <StatisticsCard>
        <Leaderboard sx={{ fontSize: 32 }} />
        <Typography>
          Meiste Reviews: {statisticsData.mostReviewedPlace} ({statisticsData.mostReviewedPlaceCount})
        </Typography>
      </StatisticsCard>
      <StatisticsCard>
        <Star sx={{ fontSize: 32 }} />
        <Typography>
          Am besten bewertet: {statisticsData.bestRatedPlace} ({statisticsData.bestRatedPlaceRating.toFixed(1)})
        </Typography>
      </StatisticsCard>
      <StatisticsCard>
        <StarHalf sx={{ fontSize: 32 }} />
        <Typography>
          Durchschnittliche Bewertung: {statisticsData.averageRating.toFixed(1)}
        </Typography>
      </StatisticsCard>
    </Box>
  );
};

export default Statistics;