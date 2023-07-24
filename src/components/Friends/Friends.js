import styles from './Friends.module.css';
import { Link } from 'react-router-dom';
import { request } from '../../services/request';
import { useState, useEffect } from 'react';

export function Friends() {

    const [friends, setFiends] = useState([]);

    useEffect(() => {

        request('get', 'api/friend/my-friends').then(x => setFiends(x.data));
    }, []);

    const removeFriend = async(id) => {

        request('post', `api/friend/remove?friendId=${id}`);
        setFiends(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['friends-container']}>
            {friends.length === 0 ? <div className='text-light'>No friends</div> : friends.map(x => (
                <section key={x.id} className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                    <Link to={`/user/${x.id}`} className={styles['friends-container-link']}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                        <div className="card-body">
                            <h5 className="text-light">{x.name}</h5>
                        </div>
                    </Link>
                    <button onClick={() => removeFriend(x.id)} className="btn btn-outline-danger">Remove</button>
                </section>
            ))}
        </div>
    );
}