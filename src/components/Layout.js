import { NavMenu } from './NavMenu/NavMenu';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

export function Layout({ children }) {
    
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login' && location.pathname !== '/register' ?
                <>
                    <NavMenu />
                    <Sidebar />
                </>
                :
                null}
            <>
                {children}
            </>
        </div>
    );
}