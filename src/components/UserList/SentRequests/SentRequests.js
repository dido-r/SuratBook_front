import { useState, useEffect } from "react";
import { request } from '../../../services/request';
import styles from './SentRequests.module.css';
import { Link } from "react-router-dom";

export function SentRequests() {

    const [sent, setSent] = useState([]);

    useEffect(() => {

        request('get', 'api/friend/sent').then(x => setSent(x.data))
    }, []);

    return (
        <div className={styles['user-container']}>
            {sent.map(x => (
                <section key={x.id} className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                    <Link to={`/user/${x.id}`} className={styles['friends-container-link']}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                        <div className="card-body">
                            <h5 className="text-light">{x.name}</h5>
                        </div>
                    </Link>
                    <p className="text-light">Waiting for approval</p>
                </section>
            ))}
        </div>
    );
}