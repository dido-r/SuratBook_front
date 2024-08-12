import { Link } from 'react-router-dom';
import styles from './FriendsOnline.module.css';


export function FriendsOnline({
    onlineUsers
}) {

    return (
        <div className={`${styles['side-menu']} text-bg-dark`}>
            <div className='text-center'>
                <h5 className={`${styles['online-friends']} text-white`}>Friends online</h5>
            </div>
            <hr />
            <ul className="nav flex-column">
                {onlineUsers.map(x => (
                    <li key={x.id} className="nav-item">
                        <Link to={`/user/${x.id}`} className={`${styles['nav-link']} text-white`}><img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />{x.name}</Link>
                    </li>))}
            </ul>
        </div>
    );
}