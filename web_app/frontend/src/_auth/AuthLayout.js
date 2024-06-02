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
                <section className='flex flex-1 justify-center items-center flex-col py-10'>
                    <Outlet /> {/* Outlet is used as a placeholder for rendering child routes/components*/}
                </section>

                <img src="/static/images/nina-kick.png" alt="logo" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
            </>
        )}
        </>
    );
}

export default AuthLayout;