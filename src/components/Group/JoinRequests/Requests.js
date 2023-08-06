import { Link } from 'react-router-dom';
import styles from './Requests.module.css'
import { useEffect, useState } from 'react';
import { request } from '../../../services/request';


export function Requests({
    groupData,
    setLoading
}) {

    const [pending, setPending] = useState([]);

    useEffect(() => {
        setLoading(true);
        request('get', `api/group/pending-requests?groupId=${groupData.id}`).then(x => {
            setPending(x.data);
            setLoading(false);
        });
    }, [groupData.id, setLoading]);

    const approveJoin = async (requestId) => {

        await request('post', `api/group/approve-request?requestId=${requestId}`);
        setPending(current => current.filter(x => x.id === requestId));
    }

    const declineJoin = async (requestId) => {

        await request('post', `api/group/decline-request?requestId=${requestId}`);
        setPending(current => current.filter(x => x.id === requestId));
    }

    return (

        pending.length === 0 ?
            <h4 className='text-light text-center'>No pending requests</h4> :
            pending.map(x => (
                <div className={styles['request-container']}>
                    <section key={x.id} className={`${styles['request-container-section']} bg-dark bg-gradient`}>
                        <Link to={`/user/${x.userId}`} className={styles['request-container-link']}>
                            <img className="card-img-top" src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" />

                            <div className="card-body">
                                <h5 className="text-light">{x.name}</h5>
                            </div>
                        </Link>
                        <button className="btn btn-outline-primary" onClick={() => approveJoin(x.id.toLowerCase())}>Approve</button>
                        <button className="btn btn-outline-danger" onClick={() => declineJoin(x.id.toLowerCase())}>Decline</button>
                    </section>
                </div>
            ))
    );
}
