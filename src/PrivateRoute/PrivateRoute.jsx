// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
