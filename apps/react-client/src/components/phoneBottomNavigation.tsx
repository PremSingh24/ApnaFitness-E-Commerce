import { BottomNavigation,BottomNavigationAction } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import NotificationsIcon from '@mui/icons-material/Notifications';


const PhoneBottomNavigation= () =>{
    const [_value,setValue] = useState(window.location.pathname)
    const navigate = useNavigate();


    
    return (
        <BottomNavigation 
        sx={{width:"100%",position:"fixed",bottom:0,
        display: { xs: 'flex',sm:"none", }}} 
        value={window.location.pathname} 
        onChange={(_event,newValue)=>{setValue(newValue)}}
        showLabels
        >
            <BottomNavigationAction label="home" icon={<HomeIcon/>} onClick={()=>{navigate("/")}} value={"/"}/>
            <BottomNavigationAction label="wishlist" icon={<FavoriteIcon/>} onClick={()=>{navigate("/mywishlist")}} value={"/mywishlist"}/>
            
            <BottomNavigationAction label="profile" icon={<PersonIcon/>} onClick={()=>{navigate("/user")}} value={"/user"}/>

            {/* <BottomNavigationAction label="notification" icon={<NotificationsIcon/>}/>
            <BottomNavigationAction label="support" icon={<SupportAgentIcon/>}/> */}

        </BottomNavigation>

    )
}

export default PhoneBottomNavigation;