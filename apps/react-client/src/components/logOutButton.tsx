import { Button } from "@mui/material";
import { useLoginStore } from "../contexts";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";




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
        size="large"
        onClick={()=>{logOut()}}
        sx={{marginTop:"20px"}}
        fullWidth
         
        >
        LOG OUT
        </Button>
        </NavLink>
    )


}

export default LogOutButton