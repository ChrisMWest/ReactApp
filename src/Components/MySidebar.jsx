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
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MessagingModal from './MessagingModal';
import {Link} from "react-router-dom";
import Home from "./Home";
import Settings from './Settings';
import Media from './Media';
import Logout from './Logout';
import ViewUserPage from './ViewUserPage';

export default function MySidebar({onCollapse, onPageChange}) {

    const {collapseSidebar, rtl} = useProSidebar();
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userRefresh, setUserRefresh] = useState(true);

    const displayUsers = () => {
      console.log("users clicked");
    }

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {

      const getUserData = () => {
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
      getUserData();

      const getFriendData = () => {
        axios.get('http://localhost:8080/getFriends', {
          params: {
            username: localStorage.getItem("username")
          }
          })
          .then((response) => {
              console.log(response.data);
              setFriends(response.data);
          })
          .catch((error) => {
              console.log(error);
          })
      }
      getFriendData();
  }, [userRefresh]);

  const handleAddFriend = (username) => {

    axios.post('http://localhost:8080/newFriendship', {
        username: localStorage.getItem("username"),
        recipient: username
    }) 
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
    
}

  const handleDeleteFriend = (username) => {
    
    axios.post('http://localhost:8080/deleteFriendship', {
        username: localStorage.getItem("username"),
        recipient: username
    }) 
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
  }

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
                {if(user.username !== localStorage.getItem("username") && !friends.some(el => el.username === user.username)) {
                  return <MenuItem 
                  suffix={<AddIcon onClick={() => {
                    handleAddFriend(user.username);
                    setUserRefresh(!userRefresh);
                    console.log("friend one: " + localStorage.getItem("username") + " added friend two: " + user.username);
                  }}/>}
                >{user.username}</MenuItem>
                }})}
                
            </SubMenu>
            <SubMenu
              label="Friends"
              title={"Friends"}
              icon={<ContactsOutlinedIcon />}>
                {friends.map((friend) => 
                {if(friend.username !== localStorage.getItem("username")) {
                  return <MenuItem 
                  suffix={<div>
                      <MessageIcon onClick={() => {
                    console.log("suffix clicked");
                    console.log(friends.includes(friend));
                    console.log("clicked with user: " + friend.username)
                    setRecipient(friend.username);
                    setShowModal(!showModal);
                    console.log(showModal);
                    console.log(recipient)
                  }}/>
                  <DeleteIcon onClick={() => {
                    handleDeleteFriend(friend.username);
                    setUserRefresh(!userRefresh);
                }} />
                    </div>}
                  icon={<PeopleOutlinedIcon onClick={() => {
                    console.log("Clicked to go to user page")
                    onPageChange(<ViewUserPage username={friend.username} />);
                  }}/>}
                >{friend.username}</MenuItem>
                }})}
            </SubMenu>
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