import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

const Profile = (props) => {
    const [username, setUsername] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Make get request to 
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

        const headers = {
            "X-CSRFTOKEN": Cookies.get("csrftoken")
        };

        const data = {

        };

        console.log(window.location.href);

        let get_link = "/api/get_user_info?username=" + searchParams.get("username");
        if(searchParams.get("target") != null){
            get_link += "&target=" + searchParams.get("target");
        }

        axios.get(get_link, data, { headers: headers }).then(function (response) {
            console.log(response)
            setUsername(response.data["username"]);
            setFirstname(() => {
                let temp = response.data["first_name"];
                if (temp) {
                    return temp;
                }
                return "N";
            });
            setLastname(() => {
                let temp = response.data["last_name"];
                if (temp) {
                    return temp;
                }
                return "A";
            });
        }).catch(function (error) {
            console.log(error);
        });

    }, []);

    return (
        <div className='flex flex-1 mt-4 py-20'>
            <div className="w-full mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                        <div className="relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="text-4xl text-gray-600 dark:text-gray-300">{String(firstname)[0].toUpperCase() + String(lastname)[0].toUpperCase()}</span>
                        </div>

                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{username}</h3>
                            <h3 className="font-bold text-sm text-gray-400 dark:text-white mb-1 capitalize">{firstname + " " + lastname}</h3>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                <svg className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path className=""
                                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                </svg>
                                New York, NY
                            </div>
                        </div>
                    </div>
                    <div className="flex px-2 justify-center">
                        <button
                            className="w-48 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2 mx-2">
                            Follow
                        </button>
                        <button
                            className="w-48 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2 mx-2">
                            Message
                        </button>
                    </div>
                </div>

                <div className="px-4 py-4">
                    <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                        TODO: POSTS MADE BY THIS PERSON SHOULD SHOW UP HERE!
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;


