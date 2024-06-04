import React from 'react';
import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import Bottombar from '../components/Bottombar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className='w-full md:flex'>
            <Topbar />
            <Leftbar />

            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>
            
            <Bottombar />

        </div>
    );
}

export default RootLayout;