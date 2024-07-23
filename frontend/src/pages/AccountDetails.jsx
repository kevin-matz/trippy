import {
  Box
} from "@mui/material";
import EditDetailsCard from '../components/account_details/EditDetailsCard';
import DeleteAccountCard from "../components/account_details/DeleteAccountCard";

const AccountDetailsPage = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", rowGap: 4 }}>
        <EditDetailsCard />
        <DeleteAccountCard />
      </Box>
    </>
  );
};

export default AccountDetailsPage;