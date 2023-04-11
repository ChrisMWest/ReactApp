import React,{useState} from 'react';
import './App.css';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate, Routes, Route } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { io } from 'socket.io-client';

import Home from "./Home";
import Settings from "./Settings";
import Media from "./Media";
import Login from "./Login";
import MySidebar from './MySidebar';
import Logout from './Logout';

const socket = io("http://localhost:8080", {
    autoConnect: false
});


export default function Dashboard() {
  socket.connect();
  socket.emit("user-connection", localStorage.getItem("username"));
  const [socketID, setSocketID] = useState(socket.id)
  

  socket.on("everyone-message", (arg) => {
    console.log(arg)
  })

  

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(<Home />);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const PageContent = (page) => {
    return currentPage;
  }

  if(localStorage.getItem("username") === null) {
    console.log("null")
    setIsLoggedIn(false);
  }

  return (
      <ProSidebarProvider>
        <div class="container-fluid" style={({ height: "100vh" })}>
      {isLoggedIn ?
        
        <div class="row">
        <div class={collapsed ? "col-sm-1 " : "col-sm-3"}>
          <MySidebar 
            onCollapse={(arg) => {
              setCollapsed(!arg);
            }}
            onPageChange={(arg) => {
              setCurrentPage(arg);
            }}
            socket={socket}/>
        </div>   
        <div class={collapsed ? "col-sm-11" : "col-sm-9"}>
            <PageContent page={currentPage} />
      </div>
      </div>
      : <Login />
      } 
    </div>
    
      </ProSidebarProvider>
  );
}
