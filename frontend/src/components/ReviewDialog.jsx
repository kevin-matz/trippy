import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
  TextField,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material/';

const ReviewDialog = (props) => {
  const [dialogRating, setDialogRating] = useState(0);
  const [dialogText, setDialogText] = useState("");

  useEffect(() => {
    setDialogRating(0);
    setDialogText("");
  }, [props.open]);

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Review schreiben</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
          <Rating precision={0.5} onChange={(_, value) => setDialogRating(value)} />
          <TextField label="Text" multiline maxRows={4} onChange={(event) => setDialogText(event.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} disabled={props.buttonsDisabled}>Abbrechen</Button>
          <Button onClick={() => props.onSubmit(dialogRating, dialogText)} disabled={props.buttonsDisabled}>Einreichen</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ReviewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.bool.isRequired
};

export default ReviewDialog;