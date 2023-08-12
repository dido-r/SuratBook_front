import { useState, useEffect } from "react";
import { request } from '../../../services/request';
import styles from './Invitations.module.css';
import { UserCard } from "../UserCard/UserCard";

export function Invitations({
    setLoading
}) {

    const [invitations, setInvitations] = useState([]);

    useEffect(() => {

        setLoading(true);
        request('get', 'api/friend/invitations').then(x => {
            setInvitations(x.data);
            setLoading(false)
        });
    }, [setLoading]);

    const addAsFriend = async (id) => {

        request('post', `api/friend/accept?userId=${id}`)
        setInvitations(current => current.filter(x => x.id !== id));
    }

    const removeRequest = async (id) => {

        request('post', `api/friend/decline?userId=${id}`)
        setInvitations(current => current.filter(x => x.id !== id));
    }

    return (
        <div className={styles['user-container']}>
            {invitations.length !== 0 ? invitations.map(x => 
            (<UserCard 
                key={x.id} 
                x={x} 
                button={<>
                <button onClick={() => addAsFriend(x.id)} className="btn btn-outline-primary">Accept</button>
                <button onClick={() => removeRequest(x.id)} className="btn btn-outline-danger">Decline</button>
                </>} />
            )) : <h5 className="text-light text-center">No invitations</h5>}
        </div>
    );
}