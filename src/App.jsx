import React,{useState} from 'react';
import './App.css';
import axios from "axios";

import Login from "./Components/Login";
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
