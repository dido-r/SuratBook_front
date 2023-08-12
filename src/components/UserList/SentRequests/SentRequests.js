import { useState, useEffect } from "react";
import { request } from '../../../services/request';
import styles from './SentRequests.module.css';
import { UserCard } from "../UserCard/UserCard";

export function SentRequests({
    setLoading
}) {

    const [sent, setSent] = useState([]);

    useEffect(() => {

        setLoading(true);
        request('get', 'api/friend/sent').then(x => {
            setSent(x.data);
            setLoading(false);
        });
    }, [setLoading]);

    return (
        <div className={styles['user-container']}>
            {sent.length !== 0 ? sent.map(x => (<UserCard key={x.id} x={x} button={<p className="text-light">Waiting for approval</p>} />
            )) : <h5 className="text-light text-center">You have no sent requests</h5>}
        </div>
    );
}