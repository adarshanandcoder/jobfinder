import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isLoaded, user, isSignedIn } = useUser();
    const { pathname } = useLocation();

    if (!isLoaded) {
        // You can add a loading spinner or similar UI here
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to='/?sign-in=true' />;
    }

    // If user is signed in but doesn't have a role and is not on the onboarding page
    if (user && !user?.unsafeMetadata?.role && pathname !== '/onboarding') {
        return <Navigate to="/onboarding" />;
    }

    return children;
};

export default ProtectedRoute;
