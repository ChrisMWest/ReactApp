import React,{useState} from 'react';
import './App.css';
import axios from "axios";
import SubmitForm from "./SubmitForm";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        setName('');
        setPassword('');
        console.log("The name entered was: " + name + " and the password was: " + password);
        axios.get('http://localhost:8080/test', {
            username: name,
            password: password
        })
        .then(function(response) {
            console.log(response.data)
            navigate("/Home");
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
            <label for="Name">Name: </label>
            <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
            <label for="Password">Password: </label>
            <input type="text" id="Password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
            <input type="submit"></input>
            </div>
        </form>
        </div>
    )
}
