import styles from './Friends.module.css';
import { Link } from 'react-router-dom';
import { request } from '../../services/request';
import { useState, useEffect } from 'react';

export function Friends() {

    const [friends, setFiends] = useState([]);

    useEffect(() => {

        //get my friends
    }, []);

    const removeFriend = async(id) => {

        //some api for removal
        setFiends(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['user-container']}>
            {friends.map(x => (
                <section key={x.id} className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                    <Link to={`/user/${x.id}`} className={styles['friends-container-link']}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                        <div className="card-body">
                            <h5 className="text-light">{x.name}</h5>
                        </div>
                    </Link>
                    <button onClick={() => removeFriend(x.id)} className="btn btn-outline-primary">Accept</button>
                </section>
            ))}
        </div>
    );
}