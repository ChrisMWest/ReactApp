import React,{useState} from 'react';
import './App.css';
import axios from "axios";
import SubmitForm from "./Components/SubmitForm";

import Login from "./Components/Login";
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
