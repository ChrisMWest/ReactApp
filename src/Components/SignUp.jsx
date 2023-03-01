import React,{useState} from 'react';
import './App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import MySidebar from './MySidebar';


export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const setDefaults = () => {
        setName('');
        setPassword('');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setDefaults();
        console.log("The name entered was: " + name + " and the password was: " + password);
        axios.post('http://localhost:8080/signup', {
            username: name,
            password: password
        })
        .then(function(response) {
            console.log(response.data)
            if(response.data == "This username already exists.") {
                console.log(response.data);
            } else {
                console.log("You have successfully signed up!");
                navigate("/Login")
            }
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    return (
        <div class="container align-middle">
            <form onSubmit={handleSubmit}>
            <div class="form-group row justify-content-center align-items-center">
                <div class="col-xs-6">      
                    <label class="form-label" for="Name">Name: </label>       
                    <input type="text" id="Name" name="Name" class="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                    
                </div>
            </div>
            <div class="form-group row justify-content-center align-items-center">
                <div class="col-xs-6">    
                    <label class="form-label" for="Password">Password: </label>         
                    <input type="text" id="Password" name="Password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
            </div>
            <div class="form-group row justify-content-center align-items-center">
                <div class="col-xs-2">
                    <button type="submit" class="btn btn-primary btn-block mb-4">Sign Up!</button>
                </div>
            </div>
            </form>
            <div class="justify-content-center align-items-center">
                <div class="col-xs-2">
                    <Link to="/Login">
                        <button class="btn btn-primary btn-block mb-4">Go to Login page.</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
