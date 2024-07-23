import '../App.css'
import background from '../assets/404.png'
import {
  Button
} from '@mui/material';
import {
  Home
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <img src={background} className="background" alt="Background" />
      <div className='navbar'>
        <Button sx={{ color: "#fff", ml: "auto" }} variant="text" endIcon={<Home />} onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </>
  );
};

export default NoPage