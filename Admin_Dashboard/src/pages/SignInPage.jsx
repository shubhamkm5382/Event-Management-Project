import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px"}}>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/after-sign-in" />
    </div>
  );
}
