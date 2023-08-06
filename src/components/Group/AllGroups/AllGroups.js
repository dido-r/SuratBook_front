import { Link } from 'react-router-dom';
import styles from './AllGroups.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { request } from '../../../services/request';
import { Spinner } from '../../Spinner/Spinner'

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
                    <section key={x.id} className={`${styles['group-container-section']} bg-dark bg-gradient`}>
                        <Link to={`/group/${x.id}`} className={styles['group-container-link']}>
                            <img className="card-img-top" src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="img" />

                            <div className="card-body">
                                <h5 className="text-light">{x.name}</h5>
                            </div>
                            <button className="btn btn-outline-light">View</button>
                        </Link>
                    </section>
                ))}
        </div>
    );
}