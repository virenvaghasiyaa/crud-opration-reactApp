import './home.scss';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import {AddUser, deleteUser, editUser, getAllUsers, getUser} from '../../Api/usersApi'

export default function Home() {

    const [usersData, setUsersData] = useState([]);
    const [addshow, setAddShow] = useState(false);
    const [editshow, setEditShow] = useState(false);
    const [state, setState] = useState({
        name: '',
        username: '',
        website: ''
    });
    const [editState, setEditState] = useState({
        name: '',
        username: '',
        website: '',
    })
    const [userId, setUserId] = useState('');


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
            setUsersData(res.data);
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditState((prevState) => {
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
            // console.log('add user', res.data);
            if (res && state.name.length !== 0 && state.username.length !== 0 && state.website.length !== 0) {
                fetchAllUserdata();
            }
        }).catch(err => err)
    }

    const fetchUser = (uid) => {
        getUser(uid).then((response) => {
            let res = response.data;
            // console.log('get user', res);
            setUserId(res.id)
            setEditState({
                name: res.name,
                username: res.username,
                website: res.website
            });
        })
    }

    const handleEditUser = (e) => {
        e.preventDefault();
        const dataObject = {
            id: '',
            name: editState.name,
            username: editState.username,
            website: editState.website
        }
        // console.log('id', userId);
        editUser(userId, dataObject).then((response) => {
            let res = response.data;
            // console.log('edit user', res);
            setEditState({
                name: res.name,
                username: res.name,
                website: res.website
            })
            fetchAllUserdata();
        }).catch(err => err)
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
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h3 className='druk-font mb-0'>UserList</h3>
                        <a href="#" className='btn-clickable druk-font d-flex align-items-center'
                           onClick={handleAddUserShow}>
                            <svg width='20' height='20' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                 x="0px" y="0px" viewBox="0 0 512 512" className='me-1'>
                                <g>
                                    <g>
                                        <path
                                            d="M426.667,170.667h-85.333V85.333C341.333,38.202,303.131,0,256,0s-85.333,38.202-85.333,85.333v85.333H85.333    C38.202,170.667,0,208.869,0,256s38.202,85.333,85.333,85.333h85.333v85.333C170.667,473.798,208.869,512,256,512    s85.333-38.202,85.333-85.333v-85.333h85.333C473.798,341.333,512,303.131,512,256S473.798,170.667,426.667,170.667z     M426.667,298.667H320c-11.782,0-21.333,9.551-21.333,21.333v106.667c0,23.567-19.099,42.667-42.667,42.667    s-42.667-19.099-42.667-42.667V320c0-11.782-9.551-21.333-21.333-21.333H85.333c-23.567,0-42.667-19.099-42.667-42.667    s19.099-42.667,42.667-42.667H192c11.782,0,21.333-9.551,21.333-21.333V85.333c0-23.567,19.099-42.667,42.667-42.667    s42.667,19.099,42.667,42.667V192c0,11.782,9.551,21.333,21.333,21.333h106.667c23.567,0,42.667,19.099,42.667,42.667    S450.234,298.667,426.667,298.667z"/>
                                    </g>
                                </g>
                            </svg>
                            Add user
                        </a>
                    </div>

                    {/* add user modal */}
                    <Modal show={addshow} onHide={handleAddUserClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='druk-font'>Add new user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='mb-3'>
                                <form onSubmit={handleAddUser}>
                                    <div className='mb-2'>
                                        <label htmlFor="name" className='mb-1 druk-font'>Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='form-control'
                                            id='name'
                                            value={state.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <label htmlFor="username" className='mb-1 druk-font'>Username</label>
                                            <input
                                                type="text"
                                                name='username'
                                                className='form-control'
                                                id='username'
                                                value={state.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="website" className='mb-1 druk-font'>Website</label>
                                            <input
                                                type="text"
                                                name='website'
                                                className='form-control'
                                                id='website'
                                                value={state.website}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-clickable druk-font w-100'
                                            onClick={handleAddUserClose}>Add user
                                    </button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>


                    <div className='table-container px-4 pt-2 pb-1'>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th className='druk-font' scope="col">Id</th>
                                <th className='druk-font' scope="col">Name</th>
                                <th className='druk-font' scope="col">Username</th>
                                <th className='druk-font' scope="col">Website</th>
                                <th className='druk-font text-end' scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersData && usersData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.website}</td>
                                        <td className='text-end'>
                                            {/* edit */}
                                            <Link to='#' className='me-3' onClick={() => {
                                                handleEditUserShow();
                                                fetchUser(item.id);
                                            }}>
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg" className='edit-icon'>
                                                    <path
                                                        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                                                        stroke="#292D32" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round"/>
                                                    <path
                                                        d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
                                                        stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"
                                                        strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M14.91 4.15002C15.58 6.54002 17.45 8.41002 19.85 9.09002"
                                                          stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Link>

                                            {/* delete */}
                                            <Link to="#" className='me-4' onClick={() => {
                                                handleDeleteUser(item.id);
                                            }}>
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg" className='delete-icon'>
                                                    <g id="Iconly/Light/Delete">
                                                        <g id="Delete">
                                                            <path id="Stroke 1"
                                                                  d="M19.3249 9.4682C19.3249 9.4682 18.7819 16.2032 18.4669 19.0402C18.3169 20.3952 17.4799 21.1892 16.1089 21.2142C13.4999 21.2612 10.8879 21.2642 8.27991 21.2092C6.96091 21.1822 6.13791 20.3782 5.99091 19.0472C5.67391 16.1852 5.13391 9.4682 5.13391 9.4682"
                                                                  stroke="#130F26" strokeWidth="1.5"
                                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path id="Stroke 3" d="M20.7082 6.23969H3.75024"
                                                                  stroke="#130F26" strokeWidth="1.5"
                                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path id="Stroke 5"
                                                                  d="M17.4407 6.23967C16.6557 6.23967 15.9797 5.68467 15.8257 4.91567L15.5827 3.69967C15.4327 3.13867 14.9247 2.75067 14.3457 2.75067H10.1127C9.5337 2.75067 9.0257 3.13867 8.8757 3.69967L8.6327 4.91567C8.4787 5.68467 7.8027 6.23967 7.0177 6.23967"
                                                                  stroke="#130F26" strokeWidth="1.5"
                                                                  strokeLinecap="round" strokeLinejoin="round"/>
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
                    </div>

                    {/* edit user modal */}
                    <Modal show={editshow} onHide={handleEditUserClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='druk-font'>Edit user</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <form onSubmit={handleEditUser}>
                                    <div className='mb-2'>
                                        <label htmlFor="name" className='mb-1 druk-font'>Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            className='form-control'
                                            id='name'
                                            value={editState.name}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className='row mb-4'>
                                        <div className='col'>
                                            <label htmlFor="username" className='mb-1 druk-font'>Username</label>
                                            <input
                                                type="text"
                                                name='username'
                                                className='form-control'
                                                id='username'
                                                value={editState.username}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className='col'>
                                            <label htmlFor="website" className='mb-1 druk-font'>Website</label>
                                            <input
                                                type="text"
                                                name='website'
                                                className='form-control'
                                                id='website'
                                                value={editState.website}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn-clickable druk-font w-100'
                                            onClick={handleEditUserClose}>Update user
                                    </button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    )
}
