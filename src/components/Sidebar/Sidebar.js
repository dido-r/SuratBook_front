import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPeopleGroup, faUserGroup, faFile, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'

export function Sidebar() {

    return (
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
                <li>
                    <Link to="">
                        <FontAwesomeIcon className={styles['icon']} icon={faNewspaper} title="News" />
                    </Link>
                </li>
                <br />
            </ul>
        </div>
    );
}