import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCookies";

export const UserGuard = ({
    children,
}) => {

    const user = useCurrentUser();
    
    if (user.userId !== undefined) {

        return <Navigate to='/'/>
    } 
   
    return children ? children : <Outlet />
}