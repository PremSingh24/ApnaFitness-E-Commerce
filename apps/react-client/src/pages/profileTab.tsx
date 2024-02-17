import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, styled } from '@mui/material';
import useUsertStore from '../contexts/user.context';
import LogOutButton from '../components/logOutButton';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


const StyledCard = styled(Card)(({ theme }) => ({
    width: '350px',
    [theme.breakpoints.up('sm')]: {
      width: '480px', 
    },
    margin: 'auto',
    marginTop:"4rem",
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: `${theme.spacing(2)} !important`,
  padding: theme.spacing(3),
}));

const ProfileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  
  
}));

const IconWrapper = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
  display:"flex",
  
  
}));



const ProfileTab = () =>{
    const user = useUsertStore((state)=>state.user);

    return (
        <>
        
        <StyledCard>
        <StyledCardContent>
            <PersonIcon sx={{ fontSize: 60, marginBottom: 1 }} />
            <Typography variant="h5" gutterBottom>
            User Profile
            </Typography>
            
            <ProfileItem>
                <IconWrapper>
                    <PersonIcon />
                </IconWrapper>
                <Typography variant="h6">
                    {user.firstName} {user.lastName}
                </Typography>
            </ProfileItem>

            <ProfileItem>
                <IconWrapper>
                    <PhoneIcon />
                </IconWrapper>
                <Typography variant="h6">
                    {user.mobile}
                </Typography>
            </ProfileItem>

            {user.email !== "" ?
            
            <ProfileItem>
                <IconWrapper>
                    <EmailIcon />
                </IconWrapper>
                <Typography variant="h6">
                    {user.email}
                </Typography>
            </ProfileItem>

            :
                null
            }
            <LogOutButton/>
        </StyledCardContent>
    </StyledCard>
    </>

    )
}

export default ProfileTab;