import * as React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from '../components/BackgroundImage';
import WavyTitle from '../components/WavyTitle';
import {
  Tabs,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginTab from '../components/account/LoginTab';
import RegisterTab from '../components/account/RegisterTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <React.Fragment>{children}</React.Fragment>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Account = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  // Function for Tabswitch
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BackgroundImage />
      <div className='navbar'>
        <IconButton color="primary" sx={{ placeSelf: "flex-start" }} aria-label="back" onClick={() => navigate("/")}>
          <ArrowBack sx={{ fontSize: "42px" }} />
        </IconButton>
      </div>
      <WavyTitle title='Account' top="15%" />
      <Box sx={{ bgcolor: '#fff', width: '33%', borderRadius: '15px', boxShadow: 24 }}>
        <Box sx={{ bgcolor: '#fff', borderBottom: 1, borderColor: 'divider', borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant={"fullWidth"}>
            <Tab label="Anmelden" {...a11yProps(0)} />
            <Tab label="Registrieren" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <LoginTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterTab />
        </TabPanel>
      </Box>
    </>
  )
}
export default Account;