import React,{useState} from 'react';
import './App.css';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

import Home from "./Home";
import Settings from "./Settings";
import Media from "./Media";
import Login from "./Login";
import MySidebar from './MySidebar';



export default function Dashboard() {

  const navigate = useNavigate();

  let isLoggedIn=true;


  if(localStorage.getItem("username") === null) {
    console.log("null")
    isLoggedIn = false;
  }

  return (
      <ProSidebarProvider>
        <div class="container">
      {isLoggedIn ?
        <div class="row">      
        <div class="col-sm-9">
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
      </div>
      <div class="col-sm-3 ">
        <MySidebar />
      </div>
      </div>
      : <Login />
      } 
    
    </div>
    
      </ProSidebarProvider>
  );
}
