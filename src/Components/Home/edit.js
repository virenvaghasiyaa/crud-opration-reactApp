import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Edit() {

    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, [])

    const getUserById = () => {
        axios.get(`http://localhost:8000/users/${id}`).then((res) => {
            console.log('res', res.data);
        })
    } 

    return (
        <>
            <div className=''>
                
            </div>
        </>
    )
}
