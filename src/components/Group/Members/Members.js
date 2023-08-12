import { useEffect, useState } from 'react';
import styles from './Members.module.css';
import { Link } from 'react-router-dom'
import { request } from '../../../services/request';
import { UserCard } from '../../UserList/UserCard/UserCard';

export function Members({
    groupId,
    setLoading
}) {

    const [members, setMembers] = useState([]);

    useEffect(() => {

        setLoading(true);
        try {

            request('get', `api/group/get-members?groupId=${groupId}`).then(x => {
                setMembers(x.data);
                setLoading(false);
            });
        } catch {


        }
    }, [groupId, setLoading]);

    return (

        members.length !== 0 ? members.map(x => (
            <div key={x.id} className={styles['friends-container']}>
                <UserCard x={x} button={<button className="btn btn-outline-light">View</button>} />
            </div>
        )) : <h4 className='text-light text-center'>No members</h4>
    );
}