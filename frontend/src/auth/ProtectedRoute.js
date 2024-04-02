import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Use the authentication context to determine if the user is authenticated
  
    console.log(isAuthenticated); // Log the current authentication state

    if (!isAuthenticated) {
      // If not authenticated, redirect to the sign-in page
      return <Navigate to="/signin" replace />;
    }
  
    // If authenticated, render the children components (protected content)
    return children;
};

export default ProtectedRoute;
