import { NavMenu } from './NavMenu/NavMenu';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { request } from '../services/request';
import { useCurrentUser } from '../hooks/useCookies';

export function Layout({ children }) {
    
    const location = useLocation();
    const user = useCurrentUser();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        if(user.userId !== undefined){

            request('get', 'api/user/is-admin').then(x => setIsAdmin(x.data));
        }
        
    }, [user.userId]);

    return (
        <div>
            {location.pathname !== '/login' && location.pathname !== '/register' ?
                <>
                    <NavMenu />
                    {isAdmin ? null :<Sidebar />}
                </>
                :
                null}
            <>
                {children}
            </>
        </div>
    );
}