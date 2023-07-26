import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import axios from 'axios';
import { useCurrentUser } from '../../hooks/useCookies';
import { useForm } from '../../hooks/useForm';
import { request } from '../../services/request';

export function NavMenu() {

    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const user = useCurrentUser();

    const { values, onChangeHandler, resetValues } = useForm({

        searchTerm: '',
        place: 'users'
    });

    const signOut = async () => {

        await axios.post('https://localhost:7062/api/user/logout', {}, {
            withCredentials: true
        });

        setDropdown(!dropdown);
        navigate("/login");
    }

    const onSearchSubmit = async (e) => {

        e.preventDefault();

        if(values.place === 'users'){

            let response = await request('get', `api/user/search?name=${values.searchTerm}`);
            navigate(`/search/${values.place}`, {state: response.data});
        }

        if(values.place === 'groups'){

            let response = await request('get', `api/group/search?name=${values.searchTerm}`);
            navigate(`/search/${values.place}`, {state: response.data});
        }

        if(values.place === 'posts'){

            let response = await request('get', `api/post/search?name=${values.searchTerm}`);
            navigate(`/search/${values.place}`, {state: response.data});
        }

        resetValues(e);
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">SuratBook</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <img className="card-user-img" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt='img' />
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" onClick={() => setDropdown(!dropdown)}>
                                    {user.userName}
                                </span>
                                {dropdown ?
                                    <ul className="dropmenu dark">
                                        <Link className="dropdown-item" to={`/user/${user.userId}`} onClick={() => setDropdown(!dropdown)}>My profile</Link>
                                        <hr />
                                        <Link className="dropdown-item" onClick={() => signOut()}>Sign out</Link>
                                    </ul>
                                    :
                                    null
                                }
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={(e) => onSearchSubmit(e)}>
                            <input className="form-control me-2" required="required" name="searchTerm" type="search" placeholder="Search" aria-label="Search" value={values.searchTerm} onChange={(e) => onChangeHandler(e)} />
                            <select className="select-serch" name="place" value={values.where} onChange={(e) => onChangeHandler(e)}>
                                <option className='text-secondary' value="users">Users</option>
                                <option className='text-secondary' value="groups">Groups</option>
                                <option className='text-secondary' value="posts">Posts</option>
                            </select>
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}
