import * as React from 'react';
import {
  Button,
  Paper,
  Typography
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DeleteAccountCard = () => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const response = await fetch("/api/users/delete", {
      credentials: "include",
      method: "DELETE"
    });

    const json = await response.json();
    if (json.status !== 200) {
      alert("Ein Fehler ist aufgetreten, bitte versuchen Sie es später erneut.");
      return;
    }

    navigate("/?success=Account gelöscht!");
  };

  return (
    <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", rowGap: 2, width: "50%", p: 3 }}>
      <Typography variant="h4">
        Account löschen
      </Typography>
      <Button
        variant="contained"
        endIcon={<DeleteForever />}
        color='error'
        sx={{ marginTop: 2, marginLeft: "auto", marginRight: "auto" }}
        onClick={deleteAccount}
      >
        Account löschen
      </Button>
    </Paper>
  );
};

export default DeleteAccountCard;