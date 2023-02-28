import React,{useState} from 'react';
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

export default function Logout() {

    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.removeItem("username");
        navigate("/Login");
    }

    return (
        <div>
            <button onClick={userLogout} class="btn btn-primary btn-block mb-4 align-items-center justify-content-center">Logout</button>
        </div>
    )
}