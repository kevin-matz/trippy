import { useEffect, useState, forwardRef } from "react";
import {
  Typography,
  Box,
  Rating,
  IconButton,
  Snackbar,
  Paper
} from '@mui/material/';
import MuiAlert from '@mui/material/Alert';
import { Edit, Delete } from '@mui/icons-material/';
import ReviewDialog from "../components/ReviewDialog";

const Alert = forwardRef(function Alert(alertProps, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...alertProps} />;
});

const ReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState(null);

  const fetchReviewsData = async () => {
    const response = await fetch("/api/reviews/get/all", {
      credentials: "include"
    });

    const json = await response.json();
    if (json.status !== 200) {
      console.error("Ein Fehler ist während einer Anfrage aufgetreten.");
      return;
    }

    setReviewsData(json.data.result);
  };

  useEffect(() => {
    fetchReviewsData();
  }, []);

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
  const [dialogReviewID, setDialogReviewID] = useState(null);
  const [dialogButtonsDisabled, setDialogButtonsDisabled] = useState(false);

  const handleDialogSubmit = async (rating, text) => {
    try {
      const requestBody = {
        text: text,
        rating: rating
      };

      setDialogButtonsDisabled(true);

      const response = await fetch(`/api/reviews/${dialogReviewID}`, {
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
        setDialogOpen(false);
        setDialogReviewID(null);
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

  const handleDialogClose = () => {
    setDialogReviewID(null);
    setDialogOpen(false);
  };

  const editReview = (id) => {
    setDialogReviewID(id);
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
      return;
    }

    fetchReviewsData();
  };

  return (
    <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", rowGap: 2, width: "50%", p: 3 }}>
      <Typography variant="h4">
        Reviews
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2, mt: 2 }}>
        {
          (!reviewsData || reviewsData.length === 0) ?
          <Typography>
            Wow, solch leer!
          </Typography>
          :
          reviewsData.map((review) => (
            <Box key={review._id} sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", flexDirection: "row", columnGap: 1, alignItems: "center" }}>
                <Typography variant="subtitle2">
                  {review.destination}
                </Typography>
                <Typography>
                  {review.author.username}
                </Typography>
                <Rating value={review.rating} precision={0.5} readOnly />
                <IconButton color="primary" aria-label="edit" onClick={() => editReview(review._id)}>
                  <Edit sx={{ fontSize: "20px" }} />
                </IconButton>
                <IconButton color="primary" aria-label="delete" onClick={() => deleteReview(review._id)}>
                  <Delete sx={{ fontSize: "20px" }} />
                </IconButton>
              </Box>
              <Typography>
                {review.text}
              </Typography>
            </Box>
          ))
        }
      </Box>
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
    </Paper>
  );
};

export default ReviewsPage;