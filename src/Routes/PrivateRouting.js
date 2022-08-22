import { useLocation, Outlet, Navigate } from "react-router-dom"

export const PrivateRouting = () => {
    let location = useLocation();
    let authenticated = localStorage.getItem('password');
    return authenticated ? <Outlet/> : <Navigate to='/' state={{from: location}} />
}