// AfterSignInRedirect.jsx
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function AfterSignInRedirect() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user?.emailAddresses?.[0];
    const strategy = email?.verification?.strategy;

    console.log("Verification Strategy:", strategy);

    if (strategy === "admin") {
      // Admin के लिए दूसरे tab में खोलना
      window.open("http://localhost:5173/", "_blank");
      window.location.replace("http://localhost:3000/");
    } else {
      // Normal user के लिए same tab में redirect
      window.location.replace("http://localhost:3000/");
    }
  }, [isLoaded, user]);

  return <p>Redirecting...</p>;
}
