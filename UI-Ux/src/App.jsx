import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

import PaymentPage from './Pages/PaymentPage'
import Products from './Pages/Products';
import Home from './Pages/Home';
import SignIn from './Pages/signin';
import SignUp from './Pages/signup';
import ProductDetails from './Pages/ProductsDetails';
import CartPage from './Pages/cartPage';
import PrivateRoute from './utils/PrivateRoute'; // 👈 import it

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/signin', '/signup'];
  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;