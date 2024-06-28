import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css"

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-0 mt-2">
      <Outlet />
    </div>
  );
};

export default App;
