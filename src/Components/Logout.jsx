import React,{useState} from 'react';
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { MenuItem } from 'react-pro-sidebar';

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
        <MenuItem onClick={userLogout}>Logout</MenuItem>
    )
}