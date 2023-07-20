import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import axios from 'axios';
import { useCurrentUser } from '../../hooks/useCookies';

export function NavMenu() {

    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const user = useCurrentUser();
    
    const signOut = async() => {

        await axios.post('https://localhost:7062/api/user/logout', {}, {
            withCredentials : true
        });

        setDropdown(!dropdown);
        navigate("/login");
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">SuratBook</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <img className="card-user-img" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt='img'/>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" onClick={() => setDropdown(!dropdown)}>
                                    {user.userName}
                                </span>
                                {dropdown ? 
                                    <ul className="dropmenu dark">
                                        <Link className="dropdown-item" to={`/user/${user.userId}`} onClick={() => setDropdown(!dropdown)}>My profile</Link>
                                        <hr/>
                                        <Link className="dropdown-item" onClick={() => signOut()}>Sign out</Link>
                                    </ul>
                                    :
                                    null
                                }
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>



        {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>*/}
        {/*  <NavbarBrand className="navbar-brand" tag={Link} to="/">SuratBook</NavbarBrand>*/}
        {/*  <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />*/}
        {/*  <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>*/}
        {/*    <ul className="navbar-nav flex-grow">*/}
        {/*      <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>*/}
        {/*      </NavItem>*/}
        {/*      <NavItem>*/}
        {/*        <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>*/}
        {/*      </NavItem>*/}
        {/*    </ul>*/}
        {/*  </Collapse>*/}
        {/*</Navbar>*/}
      </header>
    );
  }
