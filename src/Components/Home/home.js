import axios from 'axios';
import './home.scss';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllUsers, AddUser, deleteUser, getUser } from '../../Api/usersApi'

export default function Home() {

    const [userData, setUserData] = useState([]);
    const [addshow, setAddShow] = useState(false);
    const [editshow, setEditShow] = useState(false);
    const [state, setState] = useState({
        name: '',
        username: '',
        website: ''
    });


    useEffect(() => {
        fetchAllUserdata();
    }, [])

    // for add user modal
    const handleAddUserShow = () => setAddShow(true);
    const handleAddUserClose = () => setAddShow(false);
    

    // for edit user modal
    const handleEditUserShow = () => setEditShow(true);
    const handleEditUserClose = () => setEditShow(false);

    const fetchAllUserdata = () => {
        getAllUsers().then((res) => {
            console.log('all users', res.data);
            setUserData(res.data);
        })
    }

    const fetchUser = (uid) => {
        getUser(uid).then((res) => {
            console.log('get user', res.data);
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        const dataObject = {
            id: '',
            name: state.name,
            username: state.username,
            website: state.website
        }
        AddUser(dataObject).then((res) => {
            console.log('add user', res.data);
            fetchAllUserdata();
        }).catch(err => err)
    }

    const handleEditUser = (e) => { 
        e.preventDefault();
        fetchUser();
    }

    const handleDeleteUser = (uid) => {
        deleteUser(uid).then((res) => {
            console.log(res);
            fetchAllUserdata();
        }).catch(err => err)
    }

    return (
        <>
            <div className='my-5'>
                <div className='container'>
                    <div className='d-flex justify-content-between'>
                        <h3>UserList</h3>
                        <Button variant='info' onClick={handleAddUserShow} >Add user</Button>
                    </div>

                    {/* add user modal */}
                    <Modal show={addshow} onHide={handleAddUserClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add new user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <form onSubmit={handleAddUser}>
                                    <div className='mb-2'>
                                        <label htmlFor="name" className='form-label'>Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='form-control'
                                            id='name'
                                            value={state.name}
                                            onChange={handleChange}
                                            placeholder='enter your name'
                                        />
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <label htmlFor="username" className='form-label'>Username</label>
                                            <input
                                                type="text"
                                                name='username'
                                                className='form-control'
                                                id='username'
                                                value={state.username}
                                                onChange={handleChange}
                                                placeholder='enter your username'
                                            />
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="website" className='form-label'>Website</label>
                                            <input
                                                type="text"
                                                name='website'
                                                className='form-control'
                                                id='website'
                                                value={state.website}
                                                onChange={handleChange}
                                                placeholder='enter your website domain'
                                            />
                                        </div>
                                    </div>
                                    <Button type='submit' className='btn btn-info w-100' onClick={handleAddUserClose}>Add user</Button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>



                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Website</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData && userData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.website}</td>
                                        <td>
                                            {/* edit */}
                                            <Link to='#' className='me-3' onClick={() => {handleEditUserShow(); fetchUser(item.id);}}>
                                                <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490.337 490.337" width='15px' height='15px' className='edit-icon' >
                                                    <g>
                                                        <g>
                                                            <path d="M229.9,145.379l-47.5,47.5c-17.5,17.5-35.1,35-52.5,52.7c-4.1,4.2-7.2,9.8-8.4,15.3c-6.3,28.9-12.4,57.8-18.5,86.7    l-3.4,16c-1.6,7.8,0.5,15.6,5.8,20.9c4.1,4.1,9.8,6.4,15.8,6.4c1.7,0,3.4-0.2,5.1-0.5l17.6-3.7c28-5.9,56.1-11.9,84.1-17.7    c6.5-1.4,12-4.3,16.7-9c78.6-78.7,157.2-157.3,235.8-235.8c5.8-5.8,9-12.7,9.8-21.2c0.1-1.4,0-2.8-0.3-4.1c-0.5-2-0.9-4.1-1.4-6.1    c-1.1-5.1-2.3-10.9-4.7-16.5l0,0c-14.7-33.6-39.1-57.6-72.5-71.1c-6.7-2.7-13.8-3.6-20-4.4l-1.7-0.2c-9-1.1-17.2,1.9-24.3,9.1    C320.4,54.879,275.1,100.179,229.9,145.379z M386.4,24.679c0.2,0,0.3,0,0.5,0l1.7,0.2c5.2,0.6,10,1.2,13.8,2.8    c27.2,11,47.2,30.6,59.3,58.2c1.4,3.2,2.3,7.3,3.2,11.6c0.3,1.6,0.7,3.2,1,4.8c-0.4,1.8-1.1,3-2.5,4.3    c-78.7,78.5-157.3,157.2-235.9,235.8c-1.3,1.3-2.5,1.9-4.3,2.3c-28.1,5.9-56.1,11.8-84.2,17.7l-14.8,3.1l2.8-13.1    c6.1-28.8,12.2-57.7,18.4-86.5c0.2-0.9,1-2.3,1.9-3.3c17.4-17.6,34.8-35.1,52.3-52.5l47.5-47.5c45.3-45.3,90.6-90.6,135.8-136    C384.8,24.979,385.7,24.679,386.4,24.679z" />
                                                            <path d="M38.9,109.379h174.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H38.9c-21.5,0-38.9,17.5-38.9,38.9v327.4    c0,21.5,17.5,38.9,38.9,38.9h327.3c21.5,0,38.9-17.5,38.9-38.9v-167.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v167.5    c0,7.9-6.5,14.4-14.4,14.4H38.9c-7.9,0-14.4-6.5-14.4-14.4v-327.3C24.5,115.879,31,109.379,38.9,109.379z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </Link>

                                            {/* delete */}
                                            <Link to="#" onClick={() => {handleDeleteUser(item.id);}}>
                                                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 458.5 458.5" width='15px' height='15px' className='delete-icon'>
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M382.078,57.069h-89.78C289.128,25.075,262.064,0,229.249,0S169.37,25.075,166.2,57.069H76.421     c-26.938,0-48.854,21.916-48.854,48.854c0,26.125,20.613,47.524,46.429,48.793V399.5c0,32.533,26.467,59,59,59h192.508     c32.533,0,59-26.467,59-59V154.717c25.816-1.269,46.429-22.668,46.429-48.793C430.933,78.985,409.017,57.069,382.078,57.069z      M229.249,30c16.244,0,29.807,11.673,32.76,27.069h-65.52C199.442,41.673,213.005,30,229.249,30z M354.503,399.501     c0,15.991-13.009,29-29,29H132.995c-15.991,0-29-13.009-29-29V154.778c12.244,0,240.932,0,250.508,0V399.501z M382.078,124.778     c-3.127,0-302.998,0-305.657,0c-10.396,0-18.854-8.458-18.854-18.854S66.025,87.07,76.421,87.07h305.657     c10.396,0,18.854,8.458,18.854,18.854S392.475,124.778,382.078,124.778z" />
                                                                <path d="M229.249,392.323c8.284,0,15-6.716,15-15V203.618c0-8.284-6.715-15-15-15c-8.284,0-15,6.716-15,15v173.705     C214.249,385.607,220.965,392.323,229.249,392.323z" />
                                                                <path d="M306.671,392.323c8.284,0,15-6.716,15-15V203.618c0-8.284-6.716-15-15-15s-15,6.716-15,15v173.705     C291.671,385.607,298.387,392.323,306.671,392.323z" />
                                                                <path d="M151.828,392.323c8.284,0,15-6.716,15-15V203.618c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v173.705     C136.828,385.607,143.544,392.323,151.828,392.323z" />
                                                            </g>
                                                        </g>
                                                    </g>

                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {/* edit user modal */}
                    <Modal show={editshow} onHide={handleEditUserClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <form onSubmit={handleEditUser}>
                                    <div className='mb-2'>
                                        <label htmlFor="name" className='form-label'>Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='form-control'
                                            id='name'
                                            value={state.name}
                                            onChange={handleChange}
                                            placeholder='enter your name'
                                        />
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <label htmlFor="username" className='form-label'>Username</label>
                                            <input
                                                type="text"
                                                name='username'
                                                className='form-control'
                                                id='username'
                                                value={state.username}
                                                onChange={handleChange}
                                                placeholder='enter your username'
                                            />
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="website" className='form-label'>Website</label>
                                            <input
                                                type="text"
                                                name='website'
                                                className='form-control'
                                                id='website'
                                                value={state.website}
                                                onChange={handleChange}
                                                placeholder='enter your website domain'
                                            />
                                        </div>
                                    </div>
                                    <Button type='submit' className='btn btn-info w-100' onClick={handleEditUserClose}>Add user</Button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    )
}
