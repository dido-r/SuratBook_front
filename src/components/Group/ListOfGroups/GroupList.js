import { Link } from 'react-router-dom';
import styles from './GroupList.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { request } from '../../../services/request';

export function GroupList({
    tag,
    userId
}) {

    const pathname = window.location.pathname;
    const path = tag === 'owner' ? `api/group/owner?userId=${userId}` : `api/group/joined?userId=${userId}`;
    const [groups, setGroups] = useState([])

    useEffect(() => {

        request('get', path).then(x => setGroups(x.data));
    }, [path]);

    return (

        <div style={pathname === "/groups" ? { "paddingTop": "5%" } : null}>


            {groups.length === 0 ?
                <h4 className='text-light text-center'>No groups</h4>
                :
                <div className={styles['group-container']} >
                    {groups.map(x => (
                        <section key={x.id} className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                            <Link to={`/group/${x.id}`} className={styles['group-container-link']}>
                                <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                                <div className="card-body">
                                    <h5 className="text-light">{x.name}</h5>
                                </div>
                            </Link>
                            {tag === 'joined' ? <button className="btn btn-outline-danger">Leave</button> : <button className="btn btn-outline-danger">Delete</button>}
                        </section>
                    ))}
                </div>
            }
        </div>
    );
}