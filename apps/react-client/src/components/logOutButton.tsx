import { Button } from "@mui/material";
import Link from "next/link";
import { toast } from "sonner";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useLogOut from "../hooks/useLogOut";

const LogOutButton = () => {
  const logOut = useLogOut();

  return (
    <Link href={"/"} style={{ width: "50%" }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<ExitToAppIcon />}
        size="large"
        onClick={async () => {
          await logOut();
          toast.error("You Logged Out!!");
        }}
        sx={{ marginTop: "20px", borderRadius: "20px", width: "60%" }}
      >
        LOG OUT
      </Button>
    </Link>
  );
};

export default LogOutButton;
