import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Divider, styled } from "@mui/material";
import useCartStore from "../store/cart.store";

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

const CartSummary = ({
  setCurrentCartStep,
  setOrderItems,
  setOrderPrice,
}: {
  setCurrentCartStep: React.Dispatch<React.SetStateAction<string>>;
  setOrderItems: React.Dispatch<React.SetStateAction<any[]>>;
  setOrderPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const cart = useCartStore((state) => state.cart);

  let cartPrice = 0;
  cart.map((obj) => (cartPrice += obj.item.currentPrice * obj.quantity));

  return (
    <StyledPaper>
      <Typography variant="h4" gutterBottom>
        Cart Summary
      </Typography>
      <SummaryItem>
        <Typography variant="body1" sx={{ fontSize: "1.23rem" }}>
          Price ({cart.length} Items):
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
          ₹{45 * cart.length}
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
          ₹{cartPrice + 45 * cart.length}
        </Typography>
      </TotalAmount>
      <Divider sx={{ width: "100%" }} />
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: "20px",
          backgroundColor: "#0066ff",
          ":hover": {
            backgroundColor: "#0052EB  ",
          },
        }}
        onClick={() => {
          setOrderItems(cart);
          setOrderPrice(cartPrice);
          setCurrentCartStep("2");
        }}
      >
        Proceed To Check Out
      </Button>
    </StyledPaper>
  );
};

export default CartSummary;
