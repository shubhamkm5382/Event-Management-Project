import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px"}}>
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/after-sign-in" />
    </div>
  );
}
