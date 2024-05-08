import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/registerPage";
import NavBar from "./components/navbar";
import ErrorPage from "./pages/errorPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SingleProductPage from "./pages/singleProductPage";
import { Suspense, lazy, useEffect } from "react";
import useProductStore from "./contexts/productListing.context";
import { useLoginStore } from "./contexts";
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
import useCategoryStore from "./contexts/category.context";
import getAllProductService from "./services/productServices/getAllProducts.service";
import getAllCategoriesService from "./services/categoryServices/getAllCategories.service";
import authenticateService from "./services/authServices/authenticate.service";
import WishlistPage from "./pages/wishlistPage";
import CartPage from "./pages/cartManagement";
import { RequiresAuth } from "./components/requiresAuth";
import UserTabs from "./pages/userTabs";
import getCartService from "./services/cartServices/getCart.service";
import useCartStore from "./contexts/cart.context";
import getWishlistService from "./services/wishlistServices/getWishlist.service";
import useWishlistStore from "./contexts/wishlist.context";
import useUserStore from "./contexts/user.context";
import PhoneBottomNavigation from "./components/phoneBottomNavigation";
import ProfileTab from "./pages/profileTab";
import OrdersTab from "./pages/ordersTab";
import AddressTab from "./pages/addressTab";
import { Toaster, toast } from "sonner";
import useLogOut from "./hooks/useLogOut";

function App() {
  const setAllProducts = useProductStore((state) => state.setAllProducts);
  const setProducts = useProductStore((state) => state.setProducts);

  const setCategories = useCategoryStore((state) => state.setCategories);

  const setUser = useUserStore((state) => state.setUser);

  const loggedIn =
    useLoginStore((state) => state.login) ||
    document.cookie === "loggedIn=true";
  const setLogin = useLoginStore((state) => state.setLogin);

  const setCartContext = useCartStore((state) => state.setCart);
  const setWishlistContext = useWishlistStore((state) => state.setWishlist);

  const logOut = useLogOut();

  useEffect(() => {
    (async () => {
      // Getting the Cart, Address, and Wishlist of the user
      if (loggedIn) {
        const response = await authenticateService();

        if (response.status !== 200) {
          await logOut();
          toast.error("Session Expired, Login Again");
        } else {
          setLogin();
          let user;
          if (response.data.sendUser.email) {
            user = response.data.sendUser;
          } else {
            user = { ...response.data.sendUser, email: "" };
          }
          setUser(user);
          const cartResponse = await getCartService();

          if (cartResponse.status === 200) {
            setCartContext(cartResponse.data.products);
          } else if (cartResponse.status === 401) {
            await logOut();
            toast.error("Session Expired, Login Again!");
          } else {
            toast.error(
              response?.message ? response.message : response.data.message
            );
          }

          const wishlistResponse = await getWishlistService();

          if (wishlistResponse.status === 200) {
            setWishlistContext(wishlistResponse.data.products);
          } else if (response.status === 401) {
            await logOut();
            toast.error("Session Expired, Login Again!");
          }
        }
      }
    })();
  }, [loggedIn]);

  useEffect(() => {
    (async () => {
      //Getting All Products
      const productResponse = await getAllProductService();

      if (productResponse.status === 200) {
        setAllProducts(productResponse.data.products);
        setProducts(productResponse.data.products);
      } else {
        toast.error(productResponse.data.message);
      }

      //Getting ALl Categories
      const categoryResponse = await getAllCategoriesService();

      if (categoryResponse.status === 200) {
        setCategories(categoryResponse.data.category);
      } else {
        toast.error("Something Went Wrong");
      }
    })();
  }, []);

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
            <Route path="myorders" element={<OrdersTab />} />
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
