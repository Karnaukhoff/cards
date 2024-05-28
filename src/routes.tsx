import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import CardPage from "./pages/CardPage";

export const AppRoutes = () => {
  
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/card/:id" element={<CardPage />} />
        </Routes>  
    );
  };