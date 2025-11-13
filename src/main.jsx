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
import EditReview from "./components/EditReview/EditReview.jsx";
import MyFavorites from "./components/MyFavorites/MyFavorites.jsx"; // ✅ import added
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import AllReviews from "./components/AllReviews/AllReviews.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "AllFood", Component: AllFood },
      {
        path: "editreview/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        Component: EditReview,
      },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "addreview", Component: AddReview },
      { path: "allreviews", Component: AllReviews },
      { path: "myreview", Component: MyReview },
      { path: "myFavorites", Component: MyFavorites }, 
      {
        path: "ProductDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductDetails,
      },
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
