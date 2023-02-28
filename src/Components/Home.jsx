import React,{useState} from 'react';
import './App.css';
import Logout from "./Logout";

export default function Home() {
    return (
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div>Welcome the my media list {localStorage.getItem("username")}!</div>
        </div>
    );
}