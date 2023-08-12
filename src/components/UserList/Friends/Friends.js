import styles from './Friends.module.css';
import { request } from '../../../services/request';
import { Spinner } from '../../Spinner/Spinner';
import { useState, useEffect } from 'react';
import { UserCard } from '../UserCard/UserCard';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../../hooks/useCookies';

export function Friends() {

    const [friends, setFiends] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useCurrentUser();
    const params = useParams();

    useEffect(() => {

        request('get', `api/friend/my-friends?userId=${params.id}`).then(x => {
            setFiends(x.data);
            setLoading(false)
        });
    }, [params.id]);

    const removeFriend = async (id) => {

        await request('post', `api/friend/remove?friendId=${id}`);
        setFiends(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['friends-container']}>
            {loading ? <Spinner /> : friends.length === 0 ?
                <h4 className='text-light'>No friends</h4> : friends.map(x => (
                    <UserCard
                        key={x.id}
                        x={x}
                        button={user.userId === params.id ? <button onClick={() => removeFriend(x.id)} className="btn btn-outline-danger">Remove</button> : null}
                    />
                ))}
        </div>
    );
}