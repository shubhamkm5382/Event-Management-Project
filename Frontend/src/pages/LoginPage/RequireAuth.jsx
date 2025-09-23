// RequireAuth.jsx
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}
