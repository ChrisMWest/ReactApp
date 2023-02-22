import React,{useState, useEffect, useMemo} from 'react';
import './App.css';
import axios from "axios";
import { FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "./Table";
import AddMediaForm from './AddMediaForm';


/**Add another file called addmedia */
export default function Media() {

    const [tableRefresh, setTableRefresh] = useState(false);
    const [tableData, setTableData] = useState([]);
    

    const setRefresh = () => {
        setTableRefresh(!tableRefresh);
    }

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
            <AddMediaForm onSubmit={(arg) => {
                console.log(arg)
                setRefresh();
            }} tableRefresh={tableRefresh} />
            <Table data={tableData} tableRefresh={tableRefresh}
             onSubmit = {(arg) => {
                console.log(arg)
                setRefresh();
            }} />
        </div>
    );
}