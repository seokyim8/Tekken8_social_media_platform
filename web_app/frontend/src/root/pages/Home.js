import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
    const [postList, setPostlist] = useState(null);

    useEffect(() => {
        // Make get request to 
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

        const headers = {
            "X-CSRFTOKEN": Cookies.get("csrftoken")
        };

        const data = {

        };

        axios.get("/api/get_all_posts", data, { headers: headers }).then(function (response) {
            setPostlist(() => {
                response.data["post_list"].forEach(element => {
                    const [, firstPart, ...rest] = element.image_src.split("/");
                    element.image_src = "/static/" + rest.join("/");
                });

                return response.data["post_list"];
            });
            console.log(response.data)
        }).catch(function (error) {
            console.log(error);
        });

    }, []);

    if (postList) {
        return (
            <div className='flex-1 mt-24 mx-2 overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600'>
                <ul>
                    {postList.map((item) => {
                        return (
                            <li key={item.post_id} className='border-b p-4 flex flex-row border:gray-100 dark:border-gray-600'>
                                <div className="relative inline-flex items-center justify-center mr-4 w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="text-2xl text-gray-900 dark:text-gray-800">{item.post_id}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <p className="flex flex-col flex-1 text-sm text-gray-500 dark:text-gray-400">
                                        <a href="#" className="flex-1 font-medium text-gray-900 dark:text-white">{item.title}</a>
                                        <span className="flex-1 font-medium text-gray-400 dark:text-white">{item.body}</span>
                                        <img src={item.image_src} />
                                        <span>{item.image_src} </span>
                                    </p>
                                    <span className="flex-1 text-xs text-blue-600 dark:text-blue-500">posted on {item.date_created}</span>
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

export default Home;