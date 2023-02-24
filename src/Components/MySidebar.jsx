import React,{useState} from 'react';
import './App.css';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, ProSidebarProvider } from 'react-pro-sidebar';

export default function MySidebar() {

    const {collapseSidebar} = useProSidebar();

    return (
        <div class="align-items-right justify-content-right" >
        <Sidebar>
          <Menu>
            <MenuItem> Documentation</MenuItem>
            <MenuItem> Calendar</MenuItem>
            <MenuItem> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
        <main>
          <button onClick={() => collapseSidebar()}>Collapse</button>
        </main>
      </div>
    )   
}