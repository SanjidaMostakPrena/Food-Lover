import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayouts from "./components/Layouts/RootLayouts.jsx";
import Home from "./components/Home/Home.jsx";
import AllFood from "./components/AllFood/AllFood.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";

import AddReview from "./components/AddReview/AddReview.jsx"; 
import MyReview from "./components/MyReview/MyReview.jsx"; 
import ProductDetails from "./components/ProductsDetails/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      { index: true, Component: Home },
      { path: "AllFood", Component: AllFood },
      
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "addreview", Component: AddReview }, 
      { path: "myreview", Component: MyReview},
      
      {
        path:'ProductDetails/:id',
        loader:({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        Component:ProductDetails
      } 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
