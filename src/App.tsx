import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VirtualizedListPage from "./pages/VirtualizedListPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/virtual-list" element={<VirtualizedListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
