import React from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [username, setUsername] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);

    useEffect (() => {
        // Make get request to 
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

        const headers = {
            "X-CSRFTOKEN": Cookies.get("csrftoken")
        };

        const data = {

        };

        axios.post("/api/get_user_info", data, {headers: headers}).then(function (response) {
            console.log(response)
            setUsername(response.data["username"]);
            setFirstname(response.data["first_name"]);
            setLastname(response.data["last_name"]);
        }).catch(function (error) {
            console.log(error);
        });

    });

    //    /* Function used for submitting account creation request */
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
        <div className='flex flex-1 mt-4 py-20'>
            <div className='mx-2'>{username}</div>
            <div className='mx-2'>{firstname}</div>
            <div className='mx-2'>{lastname}</div>
        </div>
    );
}

export default Profile;