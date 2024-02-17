import { Button } from "@mui/material";
import { useLoginStore } from "../contexts";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';





const LogOutButton = ()=> {
    const setLogOut = useLoginStore((state)=>state.setLogOut)
   

    const logOut = ()=> {
        localStorage.setItem("token","")
        localStorage.removeItem("loggedIn")
        setLogOut();
        toast.error("You Logged Out!!")

    } 

    return (
        <NavLink to={"/"} style={{width:"50%"}}>
            <Button variant="contained" color="error" 
                startIcon={<ExitToAppIcon/>}
                size="large"
                onClick={()=>{logOut()}}
                sx={{marginTop:"20px",borderRadius:"20px",width:"60%"}}
            >
                LOG OUT
            </Button>
        </NavLink>
    )

}

export default LogOutButton