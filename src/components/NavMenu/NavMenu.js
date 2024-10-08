import './NavMenu.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCookies';
import { useForm } from '../../hooks/useForm';
import { request } from '../../services/request';
import { useDropBox } from '../../hooks/useDropbox';
import { useSelector } from 'react-redux'

export function NavMenu() {

    const [src, setSrc] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const [dropdown, setDropdown] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const user = useCurrentUser();
    const { getFile } = useDropBox();
    const { values, onChangeHandler, resetValues } = useForm({

        searchTerm: '',
        place: 'users'
    });
    const connection = useSelector(state => state.connection.connection);
    const currentUser = useCurrentUser();

    useEffect(() => {

        const fetchData = async () => {

            let path = await request('get', 'api/photo/get-a-profile');
            var isAdmin = await request('get', 'api/user/is-admin');
            setIsAdmin(isAdmin.data);

            if (path.data !== null && path.data !== undefined && path.data !== '') {

                let res = await getFile(path.data);
                setSrc(URL.createObjectURL(res));
            }
        }

        if (user.userId !== undefined) {

            fetchData()
        }
    }, [user.userId]);

    const setOffline = async () => {

        try {
            connection.send('SetOffline', currentUser.userId);
            setTimeout(400)
        }
        catch (e) {
            console.log(e);
        }
    }

    const signOut = async () => {

        await request('post', 'api/user/logout');
        setDropdown(!dropdown);
        setOffline();
        navigate("/login");
        connection.stop();
    }

    const onSearchSubmit = async (e) => {

        e.preventDefault();
        navigate(`/search/${values.place}`, { state: values.searchTerm });
        resetValues(e);
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">SuratBook</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <img className="card-user-img" src={src} alt='img' onClick={() => setDropdown(!dropdown)} />
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown text-light">
                                <span className="nav-link dropdown-toggle" onClick={() => setDropdown(!dropdown)}>
                                </span>
                                {dropdown ?
                                    <ul className="dropmenu dark">
                                        {isAdmin ? null : <><Link className="dropdown-item" to={`/user/${user.userId}`} onClick={() => setDropdown(!dropdown)}>My profile</Link>
                                            <hr /></>}
                                        <Link className="dropdown-item" onClick={() => signOut()}>Sign out</Link>
                                    </ul>
                                    :
                                    null
                                }
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={(e) => onSearchSubmit(e)}>
                            <input className="form-control me-2" required="required" name="searchTerm" type="search" placeholder="Search" aria-label="Search" value={values.searchTerm} onChange={(e) => onChangeHandler(e)} />
                            <select className="select-serch" name="place" value={values.place} onChange={(e) => onChangeHandler(e)}>
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
