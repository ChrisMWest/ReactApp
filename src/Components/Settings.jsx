import React,{useState} from 'react';
import './App.css';
import Logout from './Logout';

export default function Settings() {
    return (
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div>Settings</div>
            <div>
                <Logout />
            </div>
        </div>
    );
}