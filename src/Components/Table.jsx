import React,{useState, useEffect, useMemo} from 'react';
import './App.css';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function NewTable({data, tableRefresh, onSubmit}) {

    const DeleteRow = ({index}) => {
        const handleDeleteClick = () => {
            axios.post('http://localhost:8080/deleteMedia', {
                mediaID: index
            }) 
            .then((response) => {
                onSubmit(tableRefresh);
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

    console.log(columns);
    console.log(data);
    return (
        <div class="align-items-center justify-content-center" style={{ height: 500, width: '700px' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </div>
    )
}