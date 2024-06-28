import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignIn, Main, SignUp, Profile } from "@pages";
import ProtectedRoute from "./ProtectedRoute";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="home/*"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
