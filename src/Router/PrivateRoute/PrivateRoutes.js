import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <h1>Loading...</h1>
    }

    if (user) {
        return children;
    }
    return <Navigate to={{ pathname: '/login', state: { from: location } }} replace></Navigate>
};

export default PrivateRoutes;