import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPeopleGroup, faUserGroup, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { request } from '../../services/request';

export function Sidebar() {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        request('get', 'api/user/is-admin').then(x => setIsAdmin(x.data));
        
    }, []);
    return (
        
        isAdmin ? null :
        <div className={`${styles['side-menu']} text-bg-dark bg-dark`}>
            <ul>
                <li >
                    <Link to="/">
                        <FontAwesomeIcon className={styles['icon']} icon={faHome} title="Home" />
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/groups">
                        <FontAwesomeIcon className={styles['icon']} icon={faPeopleGroup} title="Groups" />
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/users">
                        <FontAwesomeIcon className={styles['icon']} icon={faUserGroup} title="Friends" />
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/groups/create-group">
                        <FontAwesomeIcon className={styles['icon']} icon={faFile} title="Create group" />
                    </Link>
                </li>
                <br />
            </ul>
        </div>
    );
}