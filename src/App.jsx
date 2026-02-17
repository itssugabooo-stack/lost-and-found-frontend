import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import BrowseItems from "./pages/BrowseItems.jsx";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/browse" element={<BrowseItems />} />
    </Routes>
  );
}
