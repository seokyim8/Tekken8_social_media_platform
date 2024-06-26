import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import CSRFToken from '../../_auth/forms/csrftoken';

const Home = () => {
    const [postList, setPostlist] = useState(null);
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

        axios.get("/api/get_all_posts", data, { headers: headers }).then(function (response) {
            setPostlist(() => {
                response.data["post_list"].forEach(element => {
                    // Adjusting image src
                    const [, firstPart, ...rest] = element.image_src.split("/");
                    element.image_src = "/static/" + rest.join("/");

                    // Adjusting post title (preventing empty titles)
                    if (element.title == "") {
                        element.title = "(No Title)"
                    }

                    // Determining whether you can delete the post or not based on ownership
                    element.can_delete = false;
                    if (element.author == searchParams.get("username")) {
                        element.can_delete = true;
                    }
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
                                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href={"/profile/?target=" + item.author} className='flex flex-row'>
                                        <div className="relative inline-flex items-center justify-center m-4 w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                            <span className="text-xl text-gray-600 dark:text-gray-300">{String(item.first_name)[0].toUpperCase() + String(item.last_name)[0].toUpperCase()}</span>
                                        </div>

                                        <div className='flex flex-col m-5'>
                                            <span className='font-semibold'>{item.author}</span>
                                            <span className='text-gray-400'>{item.first_name} {item.last_name}</span>
                                        </div>
                                    </a>
                                    <div className="p-5">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                        <img src={item.image_src} className='max-w-3xl my-2' alt='' />
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.body}</p>
                                        <span className="flex-1 text-xs text-blue-600 dark:text-blue-500">posted on {item.date_created}</span>
                                    </div>
                                    {item.can_delete ?
                                        <form action={"/api/delete_post?username=" + searchParams.get("username")} method='post'>
                                            <CSRFToken />
                                            <button className="relative inline-flex items-center justify-center p-0.5 m-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Delete Post
                                                </span>
                                            </button>
                                            <input readOnly className='hidden' name="post_id" value={item.post_id} />
                                            <input readOnly className='hidden' name="author" value={item.author} />
                                            <input readOnly className='hidden' name="previous_page" value={window.location.href} />
                                        </form>
                                        : (
                                            <></>
                                        )}
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