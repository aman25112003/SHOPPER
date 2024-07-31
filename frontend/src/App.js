import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Shop } from "./Pages/Shop";
import { ShopCategory } from "./Pages/ShopCategory";
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { LoginSignup } from "./Pages/LoginSignup";
import { Footer } from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* SHOP ROUTE THAT IS OUR HOME PAGE */}
          <Route path="/" element={<Shop />} />

          {/* MENS ROUTE */}
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="Men" />} />
          {/* WOMENS ROUTE */}
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          {/* KIDS ROUTE */}
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="Kid" />} />

          {/* NESTED ROUTE FOR PRODUCTS SINCE ALL PRODUCTS WILL HAVE DIFFERENT PRODUCT IDS */}
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          {/* CART ROUTE */}
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
