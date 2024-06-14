import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ element }) {
  const { user } = useAuth();
  if (!user?.isAdmin) {
    alert("Login as an admin to access this page.");
    return <Navigate to="/" />;
  }
  return element;
}
