import { Link } from 'react-router-dom';
import styles from './FriendsOnline.module.css'

export function FriendsOnline() {

    return (
        <div className={`${styles['side-menu']} text-bg-dark`}>
            <div className='text-center'>
                <h5 className={`${styles['online-friends']} text-white`}>Friends online</h5>
            </div>
            <hr />
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to='/user/1' className={`${styles['nav-link']} text-white`}><img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />Friend</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/1' className={`${styles['nav-link']} text-white`}><img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />Friend</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/1' className={`${styles['nav-link']} text-white`}><img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />Friend</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/1' className={`${styles['nav-link']} text-white`}><img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />Friend</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/1' className={`${styles['nav-link']} text-white`}><img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />Friend Friend</Link>
                </li>
            </ul>
        </div>
    );
}