import { useState, useEffect } from "react";
import { request } from '../../../services/request';
import styles from './Suggestions.module.css';
import { UserCard } from "../UserCard/UserCard";

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

        await request('post', `api/friend/add?friendId=${id}`)
        setSuggestions(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['user-container']}>
            {suggestions.map(x => (
                <UserCard key={x.id} x={x} button={<button onClick={() => addAsFriend(x.id)} className="btn btn-outline-primary">Add friend</button>} />
            ))}
        </div>
    );
}