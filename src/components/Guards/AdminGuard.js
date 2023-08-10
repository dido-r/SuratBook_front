import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { request } from "../../services/request";
import { useEffect, useState } from "react";

export const AdminGuard = ({
    children,
}) => {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        
        request('get', 'api/user/is-admin').then(x => setIsAdmin(x.data));
        
    }, [])

    
    if (!isAdmin) {

        return <Navigate to='/'/>
    } 
   
    return children ? children : <Outlet />
}