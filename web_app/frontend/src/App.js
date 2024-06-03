import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import Home from './root/pages/Home';
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./root/RootLayout";


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return ( /* RETURNING VALUE HAS TO BE WRAPPED */
      <main className="flex h-screen">
        <Router>
          <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
              <Route path='/sign-in' element={<SigninForm />} />
              <Route path='/sign-up' element={<SignupForm />} />
            </Route>

            {/* private routes */}
            <Route element={<RootLayout />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </main>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);