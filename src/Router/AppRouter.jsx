import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/home";
import Shop from "../Pages/Shop/shop";
import Cart from "../Pages/Cart/cart";
import Product from "../Pages/Product/product";


function AppRouter() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
        </Routes>
    );
}

export default AppRouter;
