import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/registerPage";
import NavBar from "./components/navbar";
import ErrorPage from "./pages/errorPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SingleProductPage from "./pages/singleProductPage";
import { Suspense, lazy } from "react";
import WishlistPage from "./pages/wishlistPage";
import CartPage from "./pages/cartManagement";
import { RequiresAuth } from "./components/requiresAuth";
import UserTabs from "./pages/userTabs";
import PhoneBottomNavigation from "./components/phoneBottomNavigation";
import ProfileTab from "./pages/profileTab";
import OrdersTab from "./pages/ordersTab";
import AddressTab from "./pages/addressTab";
import { Toaster } from "sonner";
import useFetchAllProducts from "./hooks/useProductFetch";
import useFetchUserCartAndWishlist from "./hooks/useUserDataFetch";

const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));

function App() {
  useFetchAllProducts();
  useFetchUserCartAndWishlist();

  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products/:ProductId" element={<SingleProductPage />} />
          <Route
            path="/AllProducts"
            element={
              <Suspense>
                <ProductListingPage />
              </Suspense>
            }
          />

          <Route
            path="/MyWishlist"
            element={
              <RequiresAuth>
                <WishlistPage />
              </RequiresAuth>
            }
          />

          <Route
            path="/MyCart"
            element={
              <RequiresAuth>
                <CartPage />
              </RequiresAuth>
            }
          />

          <Route
            path="/user"
            element={
              <RequiresAuth>
                <UserTabs />
              </RequiresAuth>
            }
          >
            <Route index element={<ProfileTab />} />
            <Route path="profile" element={<ProfileTab />} />
            <Route path="address" element={<AddressTab />} />
            <Route path="myOrders" element={<OrdersTab />} />
          </Route>

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <PhoneBottomNavigation />
      </Router>
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
