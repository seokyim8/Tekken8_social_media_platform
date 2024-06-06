import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import Home from './root/pages/Home';
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./root/RootLayout";
import { AllUsers, EditPost, Explore, PostDetails, Profile, Saved } from "./root/pages";
import CreatePost from "./root/pages/CreatePost";

const App = () => {
  return (
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
            <Route path="/explore" element={<Explore />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post" element={<EditPost />} />
            <Route path="/posts" element={<PostDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

export default App;