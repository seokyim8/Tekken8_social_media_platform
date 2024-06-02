import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default class LoginPage extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        return(
            <Router>
                <Routes>
                    <Route path = "/" element = {<p>This is the login page</p>} />
                    {/* <Route path = "/home" element = {<HomePage />} /> */}
                </Routes>
            </Router>
        );
    }
  }
  