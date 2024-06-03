import React from 'react';
import axios from 'axios';
import CSRFToken from './csrftoken';
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

const SigninForm = () => {
    const isLoading = false;


    // /* Function used for submitting account creation request */
    // async function onSubmit(e){
    //     e.preventDefault();
    //     axios.defaults.xsrfCookieName = "csrftoken";
    //     axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

    //     const headers = {
    //         "X-CSRFTOKEN": Cookies.get("csrftoken")
    //     };

    //     const data = {
    //         username: e.target.username.value,
    //         password: e.target.password.value
    //     }

    //     axios.post("/api/login", data, {headers: headers}).then(function (response) {
    //         console.log(response)

    //     }).catch(function (error) {
    //         console.log(error);
    //     });
        
    // }

    return (
        <>
            {/* <form onSubmit={onSubmit} className="max-w-md mx-auto"> */}
            <form method='post' action="/api/login" className="max-w-md mx-auto">
                <CSRFToken />
                <div className="sm:w-420 flex-center flex-col py-4">
                    <img src="/static/images/logo.png" />
                    <h2 className='py-6'></h2>
                    <p className="small-medium md:base-regular mb-3 text-gray-500 dark:text-gray-400">To use TKSM, please sign in.</p>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="username" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                {isLoading ? (
                    <div className="px-3 py-3 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                ) : <button type="submit" className="text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>}

                <p className='text-small-regular text-light-2 text-center mt-2 mb-2'>
                    Don't have an account?&nbsp;
                    <a href="/sign-up" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sign up</a>
                </p>

            </form>
        </>
    );
}

export default SigninForm;