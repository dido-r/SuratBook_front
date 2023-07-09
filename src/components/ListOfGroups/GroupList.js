import { Link } from 'react-router-dom';
import styles from './GroupList.module.css';

export function GroupList() {

    const pathname = window.location.pathname

    return (

        <div style={pathname === "/groups" ? { "paddingTop": "5%" } : null}>
            <Link to="/groups/create-group" className={`${styles['create-group-btn']} btn btn-outline-light`}>Create group</Link>

            <div className={styles['group-container']} >

            <section className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                <Link to="/group/1" className={styles['group-container-link']}>
                    <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Group name</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Join</button>
                    <button className="btn btn-outline-danger">Leave</button>
                </form>
            </section>

            <section className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                <Link to="/group/1" className={styles['group-container-link']}>
                    <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Group name</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Join</button>
                    <button className="btn btn-outline-danger">Leave</button>
                </form>
            </section>

            <section className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                <Link to="/group/1" className={styles['group-container-link']}>
                    <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Group name</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Join</button>
                    <button className="btn btn-outline-danger">Leave</button>
                </form>
            </section>

            <section className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                <Link to="/group/1" className={styles['group-container-link']}>
                    <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Group name</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Join</button>
                    <button className="btn btn-outline-danger">Leave</button>
                </form>
            </section>

            <section className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                <Link to="/group/1" className={styles['group-container-link']}>
                    <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Group name</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Join</button>
                    <button className="btn btn-outline-danger">Leave</button>
                </form>
            </section>

            <section className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                <Link to="/group/1" className={styles['group-container-link']}>
                    <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                    <div className="card-body">
                        <h5 className="text-light">Group name</h5>
                    </div>
                </Link>
                <form>
                    <button className="btn btn-outline-primary">Join</button>
                    <button className="btn btn-outline-danger">Leave</button>
                </form>
            </section>
            </div>
        </div>
    );
}