import React,{useState} from 'react';
import './App.css';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from 'react-router-dom';

import Home from "./Home";
import Settings from "./Settings";
import Media from "./Media";
import Login from "./Login";



export default function Dashboard() {

  const navigate = useNavigate();

  let isLoggedIn=true;
  

  if(localStorage.getItem("username") === null) {
    console.log("null")
    isLoggedIn = false;
  }

  return (
      <div>
      {isLoggedIn ? 
        <Tabs
        defaultActiveKey="Home"
        id="PageTabs"
        className="mb-6"
        justify
      >
        <Tab eventKey="Home" title="Home">
          <Home />
        </Tab>
        <Tab eventKey="Media" title="Media">
          <Media />
        </Tab>
        <Tab eventKey="Settings" title="Settings">
          <Settings />
        </Tab>
      </Tabs>
      : <Login />
      } 
    </div>   
  );
}
