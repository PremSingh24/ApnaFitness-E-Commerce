import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, Outlet } from 'react-router-dom';




// function samePageLinkNavigation(
//   event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
// ) {
//   if (
//     event.defaultPrevented ||
//     event.button !== 0 || // ignore everything but left-click
//     event.metaKey ||
//     event.ctrlKey ||
//     event.altKey ||
//     event.shiftKey
//   ) {
//     return false;
//   }
//   return true;
// }

// interface LinkTabProps {
//   label: string;
//   href: string;
//   selected?: boolean;
// }

// function LinkTab(props: LinkTabProps) {
//   return (
//     <Tab
//       component={Link}
//       to={props.href}
//       aria-current={props.selected && 'page'}
//       {...props}
//     />
//   );
// }


const UserTabs = () =>{
    const [value, setValue] = React.useState(window.location.pathname);
    

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      // event.type can be equal to focus with selectionFollowsFocus.
      setValue(newValue);
    };

  return (
    <Box>
    <Box sx={{marginTop:{xs:"7rem",sm:"7rem",md:"5rem"},borderBottom:1,borderColor:"divider",width:"100%" }}>
      <Tabs value={value === "/user" ? "/user/profile" : window.location.pathname} onChange={handleChange} 
      centered textColor='secondary' indicatorColor='secondary'
      sx={{display:"flex",}}
      >

        <Tab label="Profile" component={Link} to={"profile"} sx={{fontSize:"1rem"}} value={"/user/profile"}/>
        <Tab label="Address" component={Link} to={"address"} sx={{fontSize:"1rem"}} value={"/user/address"}/>
        <Tab label="Orders" component={Link} to={"myorders"} sx={{fontSize:"1rem"}} value={"/user/myorders"}/>
      </Tabs>
      
    </Box>
    <Outlet/>
    </Box>
  );
}

export default UserTabs;