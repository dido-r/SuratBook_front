import styles from './Friends.module.css';
import { Link } from 'react-router-dom'

export function Friends() {

    return (

        <div className={styles['friends-container']}>

            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-light">View profile</button>
                </form>
            </section>
        </div>
    );
}