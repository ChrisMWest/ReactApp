import React,{useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export default function NewTable({columns, data}) {
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