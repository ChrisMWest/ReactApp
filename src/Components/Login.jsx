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
        axios.post('http://localhost:8080/test', {
            username: name,
            password: password
        })
        .then(function(response) {
            console.log(response.data)
            if(response.data == "0") {
                console.log("that username already exists")
            } else {
                navigate("/Dashboard");
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
                    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
                </div>
            </div>
            </form>

        </div>
    )
}
