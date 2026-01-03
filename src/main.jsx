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
import MyFavorites from "./components/MyFavorites/MyFavorites.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import AllReviews from "./components/AllReviews/AllReviews.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Privacy from "./components/Privacy/Privacy.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import OrderPage from "./components/OrderPage/OrderPage.jsx";
import Profile from "./components/Profile/Profile.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "allfood", Component: AllFood },
       { path: "about", Component: About },
         { path: "contact", Component: Contact },
         { path: "privacy", Component: Privacy },
         
          { path: "privacy", Component: Privacy },
          { path: "orderpage", Component: OrderPage},
          { path: "dashboard", Component: Dashboard},
      {
        path: "editreview/:id",
        loader: async ({ params }) => {
          const res = await fetch(`https://food-server-green.vercel.app/addreview/${params.id}`);
          if (!res.ok) throw new Error("Review not found");
          return res.json();
        },
        Component: EditReview,
      },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "addreview", Component: AddReview },
      { path: "allreviews", Component: AllReviews },
      { path: "myreview", Component: MyReview },
      { path: "myfavorites", Component: MyFavorites },
        { path: "profile", Component: Profile },
      {
        path: "productdetails/:id",  
        loader: async ({ params }) => {
          const res = await fetch(`https://food-server-green.vercel.app/products/${params.id}`);
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        },
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
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayouts from "./components/Layouts/RootLayouts.jsx";
// import Home from "./components/Home/Home.jsx";
// import AllFood from "./components/AllFood/AllFood.jsx";
// import AuthProvider from "./contexts/AuthProvider.jsx";
// import Register from "./components/Register/Register.jsx";
// import Login from "./components/Login/Login.jsx";
// import AddReview from "./components/AddReview/AddReview.jsx";
// import MyReview from "./components/MyReview/MyReview.jsx";
// import ProductDetails from "./components/ProductsDetails/ProductDetails.jsx";
// import EditReview from "./components/EditReview/EditReview.jsx";
// import MyFavorites from "./components/MyFavorites/MyFavorites.jsx";
// import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
// import AllReviews from "./components/AllReviews/AllReviews.jsx";
// import About from "./components/about/About.jsx";
// import Contact from "./components/Contact/Contact.jsx";
// import Privacy from "./components/Privacy/Privacy.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx";
// import DashboardLayout from "./components/Layouts/DashboardLayout.jsx";
// import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: RootLayouts,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, Component: Home },

//       {
//         path: "editreview/:id",
//         loader: async ({ params }) => {
//           const res = await fetch(
//             `https://food-server-green.vercel.app/addreview/${params.id}`
//           );
//           if (!res.ok) throw new Error("Review not found");
//           return res.json();
//         },
//         Component: EditReview,
//       },

//       { path: "register", Component: Register },
//       { path: "login", Component: Login },

//       {
//         path: "productdetails/:id",
//         loader: async ({ params }) => {
//           const res = await fetch(
//             `https://food-server-green.vercel.app/products/${params.id}`
//           );
//           if (!res.ok) throw new Error("Product not found");
//           return res.json();
//         },
//         Component: ProductDetails,
//       },
//     ],
//   },

//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, element: <Dashboard /> },

//       { path: "addreview", Component: AddReview },
//       { path: "allreviews", Component: AllReviews },
//       { path: "myreview", Component: MyReview },
//       { path: "myfavorites", Component: MyFavorites },

//       { path: "allfood", Component: AllFood },
//       { path: "about", Component: About },
//       { path: "contact", Component: Contact },
//       { path: "privacy", Component: Privacy },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </StrictMode>
// );
