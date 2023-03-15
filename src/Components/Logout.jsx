import React,{useState} from 'react';
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { MenuItem } from 'react-pro-sidebar';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

export default function Logout({socket}) {

    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.removeItem("username");
        socket.disconnect();
        navigate("/Login");
    }

    return (
        <MenuItem icon={<LogoutIcon />} onClick={userLogout}>Logout</MenuItem>
    )
}