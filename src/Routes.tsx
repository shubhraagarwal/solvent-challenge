import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Details from "./components/Details";
type Props = {};

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
};

export default Router;
