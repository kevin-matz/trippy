import { useRef, useState, forwardRef } from "react";
import {
  FilledInput,
  InputLabel,
  Box,
  Button,
  InputAdornment,
  FormControl,
  IconButton,
  Snackbar,
  TextField
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterTab = () => {
  const navigate = useNavigate();

  const [registerBtnDisabled, setRegisterBtnDisabled] = useState(false);

  const registerUsernameRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const registerBirthdateRef = useRef(null);
  const registerEmailRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = (_, reason) => {
    if (reason === 'clickaway')
      return;

    setErrorOpen(false);
  };

  async function register() {
    try {
      const username = registerUsernameRef.current.value;
      const password = registerPasswordRef.current.value;
      const birthdate = registerBirthdateRef.current.value;
      const email = registerEmailRef.current.value;

      const requestBody = {
        username: username,
        password: password,
        birthdate: birthdate,
        email: email
      }
      const requestBodyString = JSON.stringify(requestBody);
      setRegisterBtnDisabled(true);
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBodyString
      });

      const json = await response.json();
      if (json.status === 200) {
        navigate("/?success=Registrierung erfolgreich!");
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
        setRegisterBtnDisabled(false);
      }
    } catch (error) {
      setErrorOpen(true);
      setErrorMessage("Ein Fehler ist aufgetreten, bitte versuche es später erneut.");
      console.error(error);
      setRegisterBtnDisabled(false);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField inputRef={registerUsernameRef} label="Username" variant="filled" sx={{ m: 2 }} />
      <FormControl sx={{ m: 2 }} variant="filled">
        <InputLabel htmlFor="password">Passwort</InputLabel>
        <FilledInput
          inputRef={registerPasswordRef}
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
      <TextField inputRef={registerBirthdateRef} label="Geburtsdatum" variant="filled" helperText="Format: YYYY-MM-DD" sx={{ m: 2, }} />
      <TextField inputRef={registerEmailRef} label="E-Mail" variant="filled" sx={{ m: 2 }} />
      <Button disabled={registerBtnDisabled} variant="contained" endIcon={<PersonAdd />} sx={{ alignSelf: "flex-start", marginTop: 2, marginLeft: "auto", marginRight: "auto" }} onClick={register}>Account erstellen</Button>
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert severity={"error"} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterTab;