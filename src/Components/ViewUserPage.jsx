import React,{useState, useEffect} from 'react';
import './App.css';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export default function ViewUserPage({username}) {


    const [tableData, setTableData] = useState([]);

    useEffect(() => {

        const getData = () => {
            axios.get('http://localhost:8080/getMedia', {
                params: {
                    username: username
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
    }, []);

    const columns = [
        {field: "id", headerName: "ID", width: 70},
        {field: "MediaType", headerName: "MediaType", width: 200},
        {field: "MediaName", headerName: "MediaName", width: 200},
        {field: "MediaPriority", headerName: "MediaPriority", width: 200}
    ];



    return (
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="align-items-center justify-content-center" style={{ height: 500, width: '700px' }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[4]}
                />
            </div>

        </div>
    )
}
