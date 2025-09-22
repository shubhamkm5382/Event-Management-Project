// AfterSignInRedirect.jsx
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function AfterSignInRedirect() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const role = user.publicMetadata?.role;

    if (role === "admin") {
      window.location.href = "http://localhost:5173/"; // Admin dashboard
    } else {
      window.location.href = "http://localhost:3000/"; // User app
    }
  }, [user]);

  return <p>Redirecting...</p>;
}
