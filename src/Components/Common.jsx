import React,{useEffect, useState, useMemo} from 'react';
import './App.css';
import axios from 'axios';


export function getTableData() {
    
            axios.get('http://localhost:8080/getMedia', {

            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    
}