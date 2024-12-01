// import React from 'react';
// import ReactDOM from 'react-dom';

// document.addEventListener('DOMContentLoaded', () => {
    //     ReactDOM.render((<App />), document.getElementById('reactMountPoint'));
    // });
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

const root = ReactDOM.createRoot(document.getElementById("reactMountPoint") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
