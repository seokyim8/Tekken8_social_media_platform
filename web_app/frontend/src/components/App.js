import React, { Component } from "react";
import { render } from "react-dom";
import LoginPage from "./LoginPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return ( /* RETURNING VALUE HAS TO BE WRAPPED WITH DIV FOR SOME REASON */
      <div>
        <h1 class="bg-gray-50 font-serif leading-normal tracking-normal">TAILWIND YAY</h1>
        <LoginPage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);