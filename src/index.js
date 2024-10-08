import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from "./Components/Login";

import Settings from "./Components/Settings";
import Dashboard from './Components/Dashboard';
import SignUp from "./Components/SignUp";
import Media from './Components/Media';
import Home from './Components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
          <Routes>
            <Route index element={<App />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Settings" element={<Settings />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/Media" element={<Media/>} />
          </Routes>
        </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
