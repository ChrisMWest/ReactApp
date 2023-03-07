import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { ProSidebar, Sidebar, Menu, MenuItem, SubMenu, useProSidebar, ProSidebarProvider, rtl } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MessagingModal from './MessagingModal';
import {Link} from "react-router-dom";
import Home from "./Home";
import Settings from './Settings';
import Media from './Media';
import Logout from './Logout';

export default function MySidebar({onCollapse, onPageChange}) {

    const {collapseSidebar, rtl} = useProSidebar();
    const [users, setUsers] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [showModal, setShowModal] = useState(false);

    const displayUsers = () => {
      console.log("users clicked");
    }

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {

      const getData = () => {
          axios.get('http://localhost:8080/getUsers', {
          })
          .then((response) => {
              console.log(response.data);
              setUsers(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
      }
      getData();
  }, []);

    return (
        <div>
        <Sidebar style={({height: "100vh"})}>
          <Menu>
          <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
                setCollapsed(!collapsed);
                onCollapse(collapsed);
              }}> Discover </MenuItem>
            <MenuItem 
              icon={<HomeIcon />}
              onClick={() => {
              onPageChange(<Home />)
            }}>Home<Link to="/Home" /></MenuItem>
            <MenuItem 
              icon={<PlayCircleIcon />}
              onClick={() => {
              onPageChange(<Media />)
            }}>Media<Link to="/Media" /></MenuItem>
            <MenuItem 
              icon={<SettingsIcon />}
              onClick={() => {
              onPageChange(<Settings />)
            }}>Settings<Link to="/Settings" /></MenuItem>
            <SubMenu
              label = "Find users"
              title={"Find users"}
              icon={<PeopleOutlinedIcon />}
            >
              {users.map((user) => 
                {if(user.username !== localStorage.getItem("username")) {
                  return <MenuItem 
                  suffix={<MessageIcon onClick={() => {
                    console.log("suffix clicked");
                    console.log("clicked with user: " + user.username)
                    setRecipient(user.username);
                    setShowModal(!showModal);
                    console.log(showModal);
                    console.log(recipient)
                  }}/>}
                  icon={<PeopleOutlinedIcon onClick={() => {
                    console.log("Clicked to go to user page")
                  }}/>}
                >{user.username}</MenuItem>
                }})}
                
            </SubMenu>
            <MenuItem
              icon={<ContactsOutlinedIcon />}> Friends</MenuItem>
            <Logout />
          </Menu>
        </Sidebar>
        {showModal ? 
          <MessagingModal recipient={recipient} showModal={showModal} 
            onClose={(arg) => {
              setShowModal(arg)
            }}/> : <br></br>} 
      </div>
    )   
}