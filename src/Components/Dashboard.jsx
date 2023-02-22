import React,{useState} from 'react';
import './App.css';
import axios from "axios";
import SubmitForm from "./SubmitForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Home from "./Home";
import Settings from "./Settings";
import Media from "./Media";



export default function Dashboard() {
  return (
    <div>
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
  );
}
