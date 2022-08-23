import React, { useState } from 'react';
import './login.scss';
import { Navigate } from 'react-router-dom';

export default function Login() {

  const [state, setState] = useState({
    userId: '',
    password: ''
  });
  const [errMsg, setErrMsg] = useState(false);
  const [emptyMsg, setEmptyMsg] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    if (state.userId.length !== 0 && state.password.length !== 0) {
      setEmptyMsg(false);
      if (userId === '123456' && password === '123456') {
        localStorage.setItem('password', 123456);
        setErrMsg(false);
        setRedirect(true);
      } else {
        setErrMsg(true);
      }
    } else {
      setEmptyMsg(true)
    }
  }

  if (redirect) {
    return (
      <Navigate to='/home' />
    )
  }
  return (
    <>
      <div className='conatiner'>
        <div className='d-flex align-items-center justify-content-center vh-100'>
          <div className='p-5 bg-white login-card'>
            <h1 className='druk-font text-center'>Logo</h1>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <label htmlFor='userId' className='mb-1 druk-font'>User Id</label>
                <input
                  type='text'
                  name='userId'
                  id='userId'
                  className='form-control'
                  value={state.userId}
                  onChange={handleChange}
                  // placeholder='userId'
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='password' className='mb-1 druk-font'>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='form-control'
                  value={state.password}
                  onChange={handleChange}
                  // placeholder='password'
                />
                {errMsg ? <small className='text-danger'>userId and password does not match please try again</small> : ''}
              </div>

              {emptyMsg ? <p className='text-danger'>Enter the value first then submit</p> : ''}

              <button type='submit' className='btn-clickable w-100 druk-font'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}