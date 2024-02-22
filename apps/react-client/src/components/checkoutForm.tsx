import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Divider, styled } from "@mui/material";
import useCartStore from "../contexts/cart.context";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: "auto",
  maxWidth: 400,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: "#fafafa",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
  borderLeft: `6px solid #0066ff`,
  textAlign: "center",
}));

const SummaryItem = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const TotalAmount = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const CheckOutForm = () => {
  const cartContext = useCartStore((state) => state.cart);

  let cartPrice = 0;
  cartContext.map((obj) => (cartPrice += obj.item.currentPrice * obj.quantity));

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <SummaryItem>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          Price ({cartContext.length} Items):
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          ₹{cartPrice}
        </Typography>
      </SummaryItem>
      <SummaryItem>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          Discount:
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          ₹{0}
        </Typography>
      </SummaryItem>
      <SummaryItem>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          Delivery Charge:
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          ₹{45}
        </Typography>
      </SummaryItem>
      <Divider sx={{ width: "100%" }} />
      <TotalAmount>
        <Typography variant="h6" sx={{ marginTop: "10px", fontWeight: "bold" }}>
          Total Amount:
        </Typography>
        <Typography
          variant="h6"
          color="black"
          sx={{ marginTop: "10px", fontWeight: "bold" }}
        >
          ₹{cartPrice + 45}
        </Typography>
      </TotalAmount>
      <Divider sx={{ width: "100%" }} />
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: "20px", backgroundColor: "#0066ff" }}
      >
        Proceed To Check Out
      </Button>
    </StyledPaper>
  );
};

export default CheckOutForm;
