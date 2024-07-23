import * as React from 'react';
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
  Paper,
  Typography,
  Box
} from "@mui/material";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditDetailsCard = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const changeUsernameRef = React.useRef(null);
  const changePasswordRef = React.useRef(null);
  const changeEmailRef = React.useRef(null);

  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Functions for Password-Textfields
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Functions for Snackbar handling
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

  async function change() {
    try {
      let username = changeUsernameRef.current.value;
      let password = changePasswordRef.current.value;
      let email = changeEmailRef.current.value;

      let requestBody = {

      }

      if (username.length > 0){
        requestBody.username = changeUsernameRef.current.value;
      }
      if (password.length > 0){
        requestBody.password = changePasswordRef.current.value;
      }
      if (email.length > 0){
        requestBody.email = changeEmailRef.current.value;
      }
      const requestBodyString = JSON.stringify(requestBody);
      const response = await fetch('/api/users/change', {
        credentials: "include",
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBodyString
      });
      const json = await response.json();
      if (json.status === 200) {
        setErrorOpen(false);
        setSuccessOpen(true);
        setTimeout(function() {
          location.reload();
        }, 2000);
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
  }

  return (
    <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", rowGap: 2, width: "50%", p: 3 }}>
      <Typography variant="h4">
        Accountdetails ändern
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <TextField inputRef={changeUsernameRef} label="Username" variant="filled" sx={{ m: 2 }} />
        <FormControl sx={{ m: 2 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Passwort</InputLabel>
          <FilledInput
            inputRef={changePasswordRef}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField inputRef={changeEmailRef} label="E-Mail" variant="filled" sx={{ m: 2 }} />
      </Box>
      <Button variant="contained" endIcon={<Person />} sx={{ marginTop: 2, marginLeft: "auto", marginRight: "auto" }} onClick={change}>Daten ändern</Button>
      <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
        <Alert severity={"success"} sx={{ width: '100%' }}>
          Datenänderung erfolgreich!
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert severity={"error"} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EditDetailsCard;