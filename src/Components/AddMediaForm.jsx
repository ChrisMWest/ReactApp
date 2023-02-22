import React,{useState, useEffect, useMemo} from 'react';
import './App.css';
import axios from "axios";

export default function AddMedia({onSubmit, tableRefresh}) {

    const [mediaType, setMediaType] = useState("Anime");
    const [mediaName, setMediaName] = useState("");   
    const [mediaPriority, setMediaPriority] = useState("Low");

    const setDefaults = () => {
        setMediaType("Anime");
        setMediaName("");
        setMediaPriority("Low");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/newMedia', {
            mediaType: mediaType,
            mediaName: mediaName,
            mediaPriority: mediaPriority
        }) 
        .then((response) => {
            setDefaults();
            onSubmit(tableRefresh);
        })
        .catch((error) => {
            console.log(error);
        })
        
    }

    return (
        <div class="h-100 d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit}>
                <div class="m-3">
                    <label> 
                        Type: 
                    </label>
                    <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                        <option selected="selected" value="Anime">Anime</option>
                        <option value="Movie">Movie</option>
                        <option value="TvShow">Tv Show</option>
                        <option value="VideoGame">Video Game</option>
                    </select>
                </div>
                <div class="m-3">
                    <label> 
                        Name: 
                    </label>
                    <input type="text" id="MediaName" name="MediaName" value={mediaName} onChange={(e) => setMediaName(e.target.value)}></input>         
                </div>
                <div class="m-3">
                    <label> 
                        Priority: 
                    </label>
                    <select value={mediaPriority} onChange={(e) => setMediaPriority(e.target.value)}>
                        <option selected="selected" value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option selected value="High">High</option>
                    </select>
                </div>
                <div>
                    <button type="submit" class="btn btn-primary btn-block mb-4">Add Media!</button>
                </div>
            </form>
        </div>
    )
}