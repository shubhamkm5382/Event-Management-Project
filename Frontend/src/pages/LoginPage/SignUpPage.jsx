import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
        background: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)),
                     url("https://images.pexels.com/photos/1540338/pexels-photo-1540338.jpeg") center/cover no-repeat`,
      }}
    >
      <SignUp
        routing="virtual"
        signInUrl="/sign-in"
        afterSignUpUrl="/after-sign-in"
      />
    </div>
  );
}
