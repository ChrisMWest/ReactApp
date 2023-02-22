import React,{useState, useEffect, useMemo} from 'react';
import './App.css';
import axios from "axios";
import { FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "./Table";


/**Add another file called addmedia */
export default function Media() {

    const [mediaType, setMediaType] = useState("Anime");
    const [mediaName, setMediaName] = useState("");   
    const [mediaPriority, setMediaPriority] = useState("Low");
    const [tableRefresh, setTableRefresh] = useState(false);
    const [tableData, setTableData] = useState([]);
    

    const setRefresh = () => {
        setTableRefresh(!tableRefresh);
    }

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
            setRefresh();
            setDefaults();
        })
        .catch((error) => {
            console.log(error);
        })
        
    }

    const DeleteRow = ({index}) => {
        const handleDeleteClick = () => {
            axios.post('http://localhost:8080/deleteMedia', {
                mediaID: index
            }) 
            .then((response) => {
                setRefresh();
            })
            .catch((error) => {
                console.log(error);
            })

        }

        return <FormControlLabel
                   control={
                       <IconButton color="secondary" aria-label="add an alarm" onClick={handleDeleteClick} >
                           <DeleteIcon style={{ color: "red" }} />
                       </IconButton>
                   }
               />
    }

    
    
    const columns = [
        {field: "id", headerName: "ID", width: 70},
        {field: "MediaType", headerName: "MediaType", width: 150},
        {field: "MediaName", headerName: "MediaName", width: 150},
        {field: "MediaPriority", headerName: "MediaPriority", width: 150},
        {field: "Actions", 
        headerName: "Actions", 
        width: 150,
        renderCell: (params) => {
            return (
                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                                    <DeleteRow index={params.row.id} />
                                 </div>
            )
        }}
    ];

    useEffect(() => {

        const getData = () => {
            axios.get('http://localhost:8080/getMedia', {

            })
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getData();
    }, [tableRefresh]);

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
            <Table columns={columns} data={tableData} />
        </div>
    );
}