import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import VirtualizedListPage from "./pages/VirtualizedListPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import ShadowPanel from "./components/ShadowPanel";
import BtnChatApp from "./components/BtnChatApp";
import ShoppingCartPage from "./pages/ShoppingCart";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Sidebar />
        <ShadowPanel />
        <BtnChatApp />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/virtualize-list" element={<VirtualizedListPage />} />
          <Route path="/product-management" element={<ProductManagementPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shopping" element={<ShoppingCartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
