import styles from './GroupList.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { request } from '../../../services/request';
import { Spinner } from '../../Spinner/Spinner';
import { GroupCard } from '../GroupCard/GroupCard';

export function GroupList({
    tag,
    userId
}) {

    const pathname = window.location.pathname;
    const path = tag === 'owner' ? `api/group/owner?userId=${userId}` : `api/group/joined?userId=${userId}`;
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true);
        request('get', path).then(x => {
            setGroups(x.data);
            setLoading(false);
        });
    }, [path]);

    return (

        <div style={pathname === "/groups" ? { "paddingTop": "5%" } : null}>
            {loading ? <Spinner /> : groups.length === 0 ?
                <h4 className='text-light text-center'>No groups</h4>
                :
                <div className={styles['group-container']} >
                    {groups.map(x => (
                        <GroupCard key={x.id} x={x}/>
                    ))}
                </div>
            }
        </div>
    );
}