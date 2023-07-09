import styles from './UserList.module.css';
import { Link } from 'react-router-dom';

export function UserList() {

    const pathname = window.location.pathname

    return (

        <div className={styles['user-container']} style={pathname === "/users" ? { "paddingTop": "5%" } : null}>
            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Add</button>
                    <button className="btn btn-outline-danger">Remove</button>
                </form>
            </section>

            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Add</button>
                    <button className="btn btn-outline-danger">Remove</button>
                </form>
            </section>

            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Add</button>
                    <button className="btn btn-outline-danger">Remove</button>
                </form>
            </section>

            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Add</button>
                    <button className="btn btn-outline-danger">Remove</button>
                </form>
            </section>

            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Add</button>
                    <button className="btn btn-outline-danger">Remove</button>
                </form>
            </section>

            <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                <Link to="/user/2" className={styles['friends-container-link']}>
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Username</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Add</button>
                    <button className="btn btn-outline-danger">Remove</button>
                </form>
            </section>
        </div>
    );
}