import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useEffect, useState } from 'react';

const AllUsers = () => {
    const [userlist, setUserlist] = useState(null);

    useEffect(() => {
        // Make get request to 
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

        const headers = {
            "X-CSRFTOKEN": Cookies.get("csrftoken")
        };

        const data = {

        };

        axios.get("/api/get_all_users", data, { headers: headers }).then(function (response) {
            setUserlist(response.data["user_list"]);
            console.log(response.data)
        }).catch(function (error) {
            console.log(error);
        });

    }, []);


    if (userlist) {
        return (
            <div className='flex-1 mt-24 mx-2 overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600'>
                <ul>
                    {userlist.map((item) => {
                        return (
                            <li key={item.user_name} className='border-b p-4 flex flex-row border:gray-100 dark:border-gray-600'>
                                <div className="relative inline-flex items-center justify-center mr-4 w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="text-2xl text-gray-600 dark:text-gray-300">{String(item.first_name)[0].toUpperCase() + String(item.last_name)[0].toUpperCase()}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <p className="flex flex-col flex-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex-1 font-medium text-gray-900 dark:text-white">{item.user_name}</span>
                                        <span className="flex-1 font-medium text-gray-400 dark:text-white">{item.first_name} {item.last_name}</span>
                                    </p>
                                    <span className="flex-1 text-xs text-blue-600 dark:text-blue-500">last logged in on {item.last_login.split("T")[0]} at {item.last_login.split("T")[1].split(".")[0]}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>

            </div>
        );
    }
    else {
        return (
            <div className='flex flex-1 mt-4 py-20'>
                <span></span>

            </div>
        )
    }
}

export default AllUsers;




// <div class="relative w-full max-w-sm overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 h-96">
//     <ul>
//         <li class="border-b border:gray-100 dark:border-gray-600">
//             <a href="#" class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <img class="me-3 rounded-full w-11 h-11" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos Avatar">
//                 <div>
//                     <p class="text-sm text-gray-500 dark:text-gray-400">New message from <span class="font-medium text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</p>
//                     <span class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
//                 </div>
//             </a>
//         </li>
//         <li class="border-b border:gray-100 dark:border-gray-600">
//             <a href="#" class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <img class="me-3 rounded-full w-11 h-11" src="/docs/images/people/profile-picture-2.jpg" alt="Joseph McFall Avatar">
//                 <div>
//                     <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Joseph McFall</span> and <span class="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</p>
//                     <span class="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</span>
//                 </div>
//             </a>
//         </li>
//         <li class="border-b border:gray-100 dark:border-gray-600">
//             <a href="#" class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <img class="me-3 rounded-full w-11 h-11" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green Avatar">
//                 <div>
//                     <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Bonnie Green</span> and <span class="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</p>
//                     <span class="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
//                 </div>
//             </a>
//         </li>
//         <li class="border-b border:gray-100 dark:border-gray-600">
//             <a href="#" class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <img class="me-3 rounded-full w-11 h-11" src="/docs/images/people/profile-picture-4.jpg" alt="Leslie Livingston Avatar">
//                 <div>
//                     <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span class="font-medium text-blue-600 dark:text-blue-500 hover:underline">@bonnie.green</span> what do you say?</p>
//                     <span class="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
//                 </div>
//             </a>
//         </li>
//         <li>
//             <a href="#" class="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
//                 <img class="me-3 rounded-full w-11 h-11" src="/docs/images/people/profile-picture-5.jpg" alt="Robert Brown Avatar">
//                 <div>
//                     <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend. </p>
//                     <span class="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
//                 </div>
//             </a>
//         </li>
//     </ul>
//     <div class="sticky bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
//         <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
//             <button type="button" class="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
//                 <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
//                 </svg>
//                 <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Latest</span>
//             </button>
//             <button type="button" class="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
//                 <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
//                     <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
//                     <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
//                 </svg>
//                 <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Following</span>
//             </button>
//             <button type="button" class="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
//                 <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                 </svg>
//                 <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Favorites</span>
//             </button>
//         </div>
//     </div>
// </div>
