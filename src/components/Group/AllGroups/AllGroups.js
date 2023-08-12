import { Link } from 'react-router-dom';
import styles from './AllGroups.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { request } from '../../../services/request';
import { Spinner } from '../../Spinner/Spinner'
import { GroupCard } from '../GroupCard/GroupCard';

export function AllGroups() {

    const [allGroups, setAllGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        request('get', 'api/group/all').then(x => {
            setAllGroups(x.data);
            setLoading(false)
        });
    }, [setLoading])

    return (

        <div className={styles['group-container']}>
            {loading ? <Spinner /> :
                allGroups.map(x => (
                    <GroupCard key={x.id} x={x} />
                ))}
        </div>
    );
}