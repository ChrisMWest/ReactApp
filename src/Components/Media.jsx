import React,{useState, useEffect, useMemo} from 'react';
import './App.css';
import axios from "axios";
import { FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "./Table";
import AddMediaForm from './AddMediaForm';
import Logout from "./Logout";

/**Add another file called addmedia */
export default function Media() {

    const [tableRefresh, setTableRefresh] = useState(false);
    const [tableData, setTableData] = useState([]);
    

    const setRefresh = () => {
        setTableRefresh(!tableRefresh);
    }

    console.log(localStorage.getItem("username"))

    useEffect(() => {

        const getData = () => {
            axios.get('http://localhost:8080/getMedia', {
                params: {
                    username: localStorage.getItem("username")
                }
            })
            .then((response) => {
                console.log(response.data);
                setTableData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getData();
    }, [tableRefresh]);

    return (
        
        <div class="h-100 d-flex align-items-center justify-content-center container">
            <div class="row">
                <div class="col-sm-3">
                    <AddMediaForm onSubmit={(arg) => {
                        console.log(arg)
                        setRefresh();
                    }} tableRefresh={tableRefresh} />
                </div>
                <div class="col-sm-5">
                    <Table data={tableData} tableRefresh={tableRefresh}
                        onSubmit = {(arg) => {
                        console.log(arg)
                    setRefresh();
                    }} />
                </div>
            </div>
        </div>
            
    );
}