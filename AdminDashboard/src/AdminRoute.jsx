import { useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';

function AdminRoute({ children }) {
    const { user } = useUser();

    if (!user) {
        return (
            <div
                style={{
                    color: "white",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                    background: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)),
                     url("https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg") center/cover no-repeat`,
                }}>
                <h2>Access Restricted</h2>
                <p>
                    You must be signed in to view this page.
                    Please log in with your <strong>admin account</strong>.
                </p>

                <SignIn />

                {/* <a 
                    href="http://localhost:3000/sign-in" 
                    style={{ 
                        display: "inline-block", 
                        marginTop: "15px", 
                        padding: "10px 20px", 
                        backgroundColor: "#667eea", 
                        color: "#fff", 
                        borderRadius: "6px", 
                        textDecoration: "none",
                        fontWeight: "500"
                    }}
                >
                    Sign In
                </a> */}
            </div>
        );
    }

    const email = user?.emailAddresses?.[0];
    const isAdmin = email?.verification?.strategy === "admin";

    if (!isAdmin) {
        return (
            <div style={{
                color: "white",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "50px",
                paddingBottom: "50px",
                background: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)),
                     url("https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg") center/cover no-repeat`,
            }}>
                <h2>Admin Access Only</h2>
                <p>
                    This page is restricted to <strong>admin users</strong> only.
                    Please log out and sign in again using your <strong>admin ID & password</strong>.
                </p>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: "60px",
                                height: "60px",
                            },
                        },
                    }}
                />

                {/* <a 
                    href="http://localhost:3000" 
                    style={{ 
                        display: "inline-block", 
                        marginTop: "15px", 
                        padding: "10px 20px", 
                        backgroundColor: "#667eea", 
                        color: "#fff", 
                        borderRadius: "6px", 
                        textDecoration: "none",
                        fontWeight: "500"
                    }}
                >
                    Sign In with Admin Account
                </a> */}
            </div>
        );
    }

    return children;
}

export default AdminRoute;
