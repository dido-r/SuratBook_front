import { useState, useEffect } from "react";
import { request } from '../../../services/request';
import styles from './Suggestions.module.css';
import { Link } from "react-router-dom";

export function Suggestions({
    setLoading
}) {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        
        setLoading(true);
        request('get', 'api/friend/all').then(x => {
            setSuggestions(x.data);
            setLoading(false);
        });
    }, [setLoading]);

    const addAsFriend = async (id) => {

        try {

            await request('post', `api/friend/add?friendId=${id}`)
        } catch {

        }
        setSuggestions(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['user-container']}>
            {suggestions.map(x => (
                <section key={x.id} className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                    <Link to={`/user/${x.id}`} className={styles['friends-container-link']}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                        <div className="card-body">
                            <h5 className="text-light">{x.name}</h5>
                        </div>
                    </Link>
                    <button onClick={() => addAsFriend(x.id)} className="btn btn-outline-primary">Add friend</button>
                </section>
            ))}
        </div>
    );
}