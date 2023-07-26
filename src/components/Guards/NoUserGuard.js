import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCookies";

export const NoUserGuard = ({
    children,
}) => {

    const user = useCurrentUser();
    
    if (user.userId === undefined) {

        return <Navigate to='/login'/>
    } 
   
    return children ? children : <Outlet />
}