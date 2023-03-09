import React,{useState} from 'react';
import './App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Dashboard from './Dashboard';



export default function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setDefaults = () => {
        setName('');
        setPassword('');
    }

    if(localStorage.getItem("username") !== null) {
        console.log("not null in login")
        setIsLoggedIn(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("The name entered was: " + name + " and the password was: " + password);
        axios.post('http://localhost:8080/login', {
            username: name,
            password: password
        })
        .then(function(response) {
            console.log(response.data)
            if(response.data == "Username or password is wrong.") {
                console.log(response.data)
            } else {
                localStorage.setItem("username", name);
                setDefaults();
                navigate("/Dashboard");
            }
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    return ( 
            <div>
                {!isLoggedIn ? 
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
                            <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
                        </div>
                    </div>
                    </form>
                    <div class="justify-content-center align-items-center">
                        <div class="col-xs-2">
                            <Link to="/SignUp">
                                <button class="btn btn-primary btn-block mb-4">Go to Sign Up page.</button>
                            </Link>
                        </div>
                    </div>
                </div>
                : <Dashboard />
                }
            </div>
            

    )
}
