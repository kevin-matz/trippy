import React from "react";
import { useEffect, useState, forwardRef } from "react";
import {
  Typography,
  Box,
  Rating,
  CircularProgress,
  IconButton,
  Snackbar,
  Button
} from '@mui/material/';
import MuiAlert from '@mui/material/Alert';
import { AccountCircle, Create, Edit, Delete } from '@mui/icons-material/';
import PropTypes from 'prop-types';
import ReviewDialog from "../ReviewDialog";

const Alert = forwardRef(function Alert(alertProps, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...alertProps} />;
});

const ReviewsCard = (props) => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogEditID, setDialogEditID] = useState(null);
  const [dialogButtonsDisabled, setDialogButtonsDisabled] = useState(false);

  const [reviewsData, setReviewsData] = useState(null);

  const fetchReviewsData = async () => {
    const response = await fetch(`/api/reviews/get/dest/${props.destination}`);
    if (response.status !== 200) {
      alert("Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.");
      return;
    }

    const json = await response.json();
    setReviewsData(json.data.result);
  };

  useEffect(() => {
    fetchReviewsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editReview = async (id) => {
    setDialogEditID(id);
    setDialogOpen(true);
  };

  const deleteReview = async (id) => {
    const response = await fetch(`/api/reviews/${id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status !== 200) {
      alert("Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.");
    }

    fetchReviewsData();
  };

  const handleDialogSubmitCreate = async (rating, text) => {
    try {
      const requestBody = {
        destination: props.destination,
        text: text,
        rating: rating
      };

      setDialogButtonsDisabled(true);

      const response = await fetch("/api/reviews", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const json = await response.json();
      if (json.status === 200) {
        setErrorOpen(false);
        setSuccessOpen(true);
        setSuccessMessage("Review eingereicht!");
        handleDialogClose();
        fetchReviewsData();
      } else {
        setErrorOpen(true);
        if (typeof json.data.result === "string") {
          /* Single error message */
          setErrorMessage(json.data.result);
        } else if (json.data.result) {
          /* Validation errors */
          const firstError = json.data.result.errors[0];
          setErrorMessage(`${firstError.msg} (${firstError.path})`);
        } else {
          setErrorMessage(json.data.message);
        }
      }
    } catch (error) {
      setErrorOpen(true);
      setErrorMessage("Ein Fehler ist aufgetreten, bitte versuche es später erneut.");
      console.error(error);
    }
    setDialogButtonsDisabled(false);
  };

  const handleDialogSubmitEdit = async (rating, text) => {
    try {
      const requestBody = {
        text: text,
        rating: rating
      };

      setDialogButtonsDisabled(true);

      const response = await fetch(`/api/reviews/${dialogEditID}`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const json = await response.json();
      if (json.status === 200) {
        setErrorOpen(false);
        setSuccessOpen(true);
        setSuccessMessage("Review bearbeitet!");
        handleDialogClose();
        fetchReviewsData();
      } else {
        setErrorOpen(true);
        if (typeof json.data.result === "string") {
          /* Single error message */
          setErrorMessage(json.data.result);
        } else if (json.data.result) {
          /* Validation errors */
          const firstError = json.data.result.errors[0];
          setErrorMessage(`${firstError.msg} (${firstError.path})`);
        } else {
          setErrorMessage(json.data.message);
        }
      }
    } catch (error) {
      setErrorOpen(true);
      setErrorMessage("Ein Fehler ist aufgetreten, bitte versuche es später erneut.");
      console.error(error);
    }
    setDialogButtonsDisabled(false);
  };

  const handleDialogSubmit = (rating, text) => {
    if (dialogEditID) {
      handleDialogSubmitEdit(rating, text);
    } else {
      handleDialogSubmitCreate(rating, text);
    }
  };

  const handleDialogClose = () => {
    setDialogEditID(null);
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      {
        reviewsData === null ?
        <CircularProgress sx={{ placeSelf: "center" }} />
        : reviewsData.length === 0 ?
        <Typography align="center">
          Wow, solch leer!
        </Typography>
        :
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
          {
            reviewsData.map((review) => (
              <Box key={review._id} sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "row", columnGap: 1, alignItems: "center", mb: 1 }}>
                  <AccountCircle sx={{ fontSize: "32px", color: "#999" }} />
                  <Typography>
                    {review.author.username}
                  </Typography>
                  <Rating value={review.rating} precision={0.5} readOnly />
                  {
                    /* When author is the current user, display "Edit" and "Delete" buttons */
                    props.userDetails && review.author.username === props.userDetails.username &&
                    <>
                      <IconButton color="primary" aria-label="edit" onClick={() => editReview(review._id)}>
                        <Edit sx={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton color="primary" aria-label="delete" onClick={() => deleteReview(review._id)}>
                        <Delete sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </>
                  }
                </Box>
                <Typography>
                  {review.text}
                </Typography>
              </Box>
            ))
          }
        </Box>
      }
      <Button variant="contained" sx={{ mx: "auto", mt: 4 }} endIcon={<Create />} onClick={() => setDialogOpen(true)}>
        Review schreiben
      </Button>
      <ReviewDialog
        open={dialogOpen}
        onSubmit={handleDialogSubmit}
        onClose={handleDialogClose}
        buttonsDisabled={dialogButtonsDisabled}
      />
      <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

ReviewsCard.propTypes = {
  destination: PropTypes.string.isRequired,
  userDetails: PropTypes.any
};

export default ReviewsCard;