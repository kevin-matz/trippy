import './App.css'
import Home from "./pages/Home";
import Account from "./pages/Account";
import Search from "./pages/Search";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Profile from "./pages/Profile.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: '#e33d94'
    }
  }
});

/* Normal theme doesn't really fit in the evening background's style */
const eveningTheme = createTheme({
  palette: {
    primary: {
      main: '#f9b42d'
    }
  }
});

function App() {
  const currentTime = new Date().getHours();
  const isEvening = currentTime >= 17 && currentTime < 22;

  return (
    <ThemeProvider theme={isEvening ? eveningTheme : theme}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;