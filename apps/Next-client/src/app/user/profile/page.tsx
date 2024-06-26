"use client";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import useUserStore from "../../../store/user.store";
import LogOutButton from "../../../components/logOutButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "350px",
  [theme.breakpoints.up("sm")]: {
    width: "480px",
  },
  margin: "auto",
  marginTop: "2rem",
  textAlign: "center",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.main}`,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: `${theme.spacing(2)} !important`,
  padding: theme.spacing(3),
}));

const ProfileItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled("span")(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
  display: "flex",
}));

const ProfileTab = () => {
  const router = useRouter();
  useEffect(() => {
    const loggedIn = document.cookie === "loggedIn=true";

    if (!loggedIn) {
      router.replace("/login");
      return;
    }
  }, []);
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Typography
        marginTop={"1rem"}
        variant="h5"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={"bold"}
      >
        My Profile
      </Typography>
      <StyledCard>
        <StyledCardContent>
          <PersonIcon sx={{ fontSize: 60, marginBottom: 1 }} />

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
            <Typography variant="h6">{user.mobile}</Typography>
          </ProfileItem>

          {user.email !== "" ? (
            <ProfileItem>
              <IconWrapper>
                <EmailIcon />
              </IconWrapper>
              <Typography variant="h6">{user.email}</Typography>
            </ProfileItem>
          ) : null}
          <LogOutButton />
        </StyledCardContent>
      </StyledCard>
    </>
  );
};

export default ProfileTab;
