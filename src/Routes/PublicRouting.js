import { useLocation, Outlet, Navigate } from 'react-router-dom';

export const PublicRouting = () => {
    let location = useLocation();
    let authenticated = localStorage.getItem('password');
    return !authenticated ? <Outlet/> : <Navigate to='/home' state={{from: location}} />
}