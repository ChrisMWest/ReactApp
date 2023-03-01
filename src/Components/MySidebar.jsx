import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, ProSidebarProvider, rtl } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MessageIcon from '@mui/icons-material/Message';

import MessagingModal from './MessagingModal';

export default function MySidebar() {

    const {collapseSidebar, rtl} = useProSidebar();
    const [users, setUsers] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [showModal, setShowModal] = useState(false);

    const displayUsers = () => {
      console.log("users clicked");
    }

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
        <div style={({ height: "100vh" }, { display: "flex", flexDirection: "row-reverse" })}>
        <Sidebar>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}> Discover </MenuItem>
            <SubMenu
              label = "Find users"
              title={"Find users"}
              icon={<PeopleOutlinedIcon />}
            >
              {users.map((user) => 
                {if(user.username !== localStorage.getItem("username")) {
                  return <MenuItem 
                  suffix={<MessageIcon />}
                  onClick={() => {
                    console.log("clicked with user: " + user.username)
                    setRecipient(user.username);
                    setShowModal(!showModal);
                    console.log(showModal);
                    console.log(recipient)
                  }}
                >{user.username}</MenuItem>
                }})}
                
            </SubMenu>
            <MenuItem
              icon={<ContactsOutlinedIcon />}> Friends</MenuItem>
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