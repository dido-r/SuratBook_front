import { useState, useEffect } from "react";
import { request } from '../../../services/request';
import styles from './Invitations.module.css';
import { Link } from "react-router-dom";

export function Invitations() {

    const [invitations, setInvitations] = useState([]);

    useEffect(() => {

        request('get', 'api/friend/invitations').then(x => setInvitations(x.data))
    }, []);

    const addAsFriend = async(id) => {

        request('post', `api/friend/accept?userId=${id}`)
        setInvitations(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['user-container']}>
            {invitations.map(x => (
                <section key={x.id} className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                    <Link to={`/user/${x.id}`} className={styles['friends-container-link']}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                        <div className="card-body">
                            <h5 className="text-light">{x.name}</h5>
                        </div>
                    </Link>
                    <button onClick={() => addAsFriend(x.id)} className="btn btn-outline-primary">Accept</button>
                </section>
            ))}
        </div>
    );
}