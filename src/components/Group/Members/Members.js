import { useEffect, useState } from 'react';
import styles from './Members.module.css';
import { Link } from 'react-router-dom'
import { request } from '../../../services/request';

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

                <section className={`${styles['friends-container-section']} bg-dark bg-gradient`}>
                    <Link to={`/user/${x.id}`} className={styles['friends-container-link']}>
                        <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                        <div className="card-body">
                            <h5 className="text-light">{x.name}</h5>
                        </div>
                        <button className="btn btn-outline-light">View profile</button>
                    </Link>
                </section>
            </div>
        )) : <h4 className='text-light text-center'>No members</h4>
    );
}