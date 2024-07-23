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
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginTab = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginUsernameRef = useRef(null);
  const loginPasswordRef = useRef(null);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorClose = (_, reason) => {
    if (reason === 'clickaway')
      return;

    setErrorOpen(false);
  };

  async function login() {
    var username = loginUsernameRef.current.value;
    var password = loginPasswordRef.current.value;

    const requestBody = {
      username: username,
      password: password
    }
    const requestBodyString = JSON.stringify(requestBody);
    const response = await fetch('/api/users/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBodyString
    });
    const json = await response.json();
    if (json.status === 200) {
      navigate("/?success=Login erfolgreich!");
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
    setLoginBtnDisabled(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField inputRef={loginUsernameRef} label="Username" variant="filled" sx={{ m: 2 }} />
      <FormControl sx={{ m: 2 }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Passwort</InputLabel>
        <FilledInput
          inputRef={loginPasswordRef}
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
      <Button
        variant="contained"
        endIcon={<Person />}
        sx={{ alignSelf: "flex-start", marginTop: 2, marginLeft: "auto", marginRight: "auto" }}
        onClick={login}
        disabled={loginBtnDisabled}
      >
        Anmelden
      </Button>
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert severity={"error"} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginTab;