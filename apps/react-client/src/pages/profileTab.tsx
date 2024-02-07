import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import useUsertStore from '../contexts/user.context';
import LogOutButton from '../components/logOutButton';



const ProfileTab = () =>{
    const user = useUsertStore((state)=>state.user);

    return (
        <>
        <Paper elevation={5}
          sx={{
            p: 4,
            margin: 'auto',
            maxWidth: 400,
            flexGrow: 1,
            marginTop:"5rem",
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              
          }}
        >
          <Grid container spacing={2} >
            <Grid item  xs={12} md={12}>
                <Typography variant='h5' color={"black"} 
                sx={{display:"flex",justifyContent:"center",
                alignItems:"center",border:"2px solid black"}}
                >
                    My Profile
                </Typography>
            </Grid>
    
            <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
                <Typography variant='h6' color={"black"} 
                sx={{display:"flex",justifyContent:"start",
                alignItems:"start"}}
                >Name</Typography>
                
            </Grid>

            <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>
                <Typography variant='h6' color={"black"} 
                    sx={{display:"flex",justifyContent:"end",
                    alignItems:"flex-end"}}
                    >
                        {user.firstName} {user.lastName}
                </Typography>
    
            </Grid>
            
            
            <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
                <Typography variant='h6' color={"black"} 
                    sx={{display:"flex",justifyContent:"start",
                    alignItems:"start"}}
                    >
                        Mobile
                </Typography>
            </Grid>

            <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>
    
                <Typography variant='h6' color={"black"} 
                sx={{display:"flex",justifyContent:"end",
                alignItems:"flex-end"}}
                >
                    {user.mobile}
                </Typography>
                
            </Grid>

            {user.email !== "" ?
            <>

            <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
                <Typography variant='h6' color={"black"} 
                    sx={{display:"flex",justifyContent:"start",
                    alignItems:"start"}}
                >
                    Email
                </Typography>
            </Grid>
            
            <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>
    
                <Typography variant='h6' color={"black"} 
                sx={{display:"flex",justifyContent:"end",
                alignItems:"flex-end"}}
                >
                   {user.email}
                </Typography>
                
            </Grid>
            </>
            :
            null
            }
            
            <Divider sx={{width:"100%"}} />

            <Grid item sx={{display:"flex",justifyContent:"center",alignItems:"center"}} xs={12} md={12}>
            <LogOutButton/>

            </Grid>
    
            
          </Grid>
          
        </Paper>

        </>
        
        
    )
}

export default ProfileTab;