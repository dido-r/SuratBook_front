import { NavMenu } from './NavMenu/NavMenu';
import { Sidebar } from '../components/Sidebar/Sidebar';

export function Layout({ children }) {

    return (
        <div>
          <NavMenu />
          <Sidebar />
        <>
          {children}
        </>
      </div>
    );
  }