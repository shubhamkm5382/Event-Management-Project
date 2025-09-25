import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
        background: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)),
                     url("https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg") center/cover no-repeat`,
      }}
    >
      <SignIn
        routing="virtual"
        signUpUrl="/sign-up"
        afterSignInUrl="/after-sign-in"
      />
    </div>
  );
}
