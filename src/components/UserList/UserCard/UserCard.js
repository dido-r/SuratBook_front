import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';
import { useState, useEffect } from 'react';
import { request } from '../../../services/request';
import { useDropBox } from '../../../hooks/useDropbox';

export function UserCard({
    x,
    button
}) {

    const [src, setSrc] = useState('https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg');
    const { getFile } = useDropBox();

    useEffect(() => {

        const fetchData = async () => {

            let path = await request('get', `api/photo/get-a-profile?userId=${x.id}`);

            if (path.data !== null && path.data !== '' && path.data !== undefined) {

                let res = await getFile(path.data);
                setSrc(URL.createObjectURL(res));
            }
        }
        fetchData();
    }, [x.id]);

    return (
        <section className={`${styles['user-card-container-section']} bg-dark bg-gradient`}>
            <Link to={`/user/${x.id}`} className={styles['user-card-container-link']}>
                <img className="card-img-top" src={src} alt="img" />

                <div className={`${styles['user-car-name']} card-body`}>
                    <h5 className="text-light">{x.name}</h5>
                </div>
                {button ? button.props.children === 'View' ? button : null : null}
            </Link>
            {button ? button.props.children !== 'View' ? button : null : <button className='btn btn-outline-light'>View</button>}
        </section>
    );
}