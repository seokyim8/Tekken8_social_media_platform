import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = (props) => {
    const isAuthenticated = false;

    return (
        <>
        {isAuthenticated ? (
            <Navigate to = "/" />
        ) : (
            <>
                <section>
                    <Outlet /> {/* Outlet is used as a placeholder for rendering child routes/components*/}
                </section>
            </>
        )}
        </>
    );
}

export default AuthLayout;