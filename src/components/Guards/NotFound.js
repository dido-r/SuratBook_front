import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {

    return (
        <div className={`${styles['not-found']} text-light`}>
            <h1 className={styles['numbers']}>404</h1>
            <h2>Oops! You seem to be lost.</h2>
            <Link to='/'>
                <button className='btn btn-outline-light'>Return Home</button>
            </Link>
        </div>
    )
}