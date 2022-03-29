import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthenticated } from "../../store/selectors/authSelector";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  const isAuthenticated = useSelector(getAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
