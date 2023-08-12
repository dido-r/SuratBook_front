import { Link } from 'react-router-dom';
import styles from './GroupCard.module.css';

export function GroupCard({
    x
}) {

    return (
        <section className={`${styles['group-container-section']} bg-dark bg-gradient text-center`}>
            <Link to={`/group/${x.id}`} className={styles['group-container-link']}>
                <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                <div className="card-body">
                    <h5 className="text-light">{x.name}</h5>
                </div>
                <button className="btn btn-outline-light">View</button>
            </Link>
        </section>
    );
}