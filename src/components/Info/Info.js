import { useEffect, useState } from 'react';
import { EditInfo } from './EditInfo/EditInfo';
import styles from './Info.module.css';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';

export function Info() {

    const [edit, setEdit] = useState(false);
    const [info, setInfo] = useState({});
    const params = useParams();

    useEffect(() => {

        request('get', `api/user/info?userId=${params.id}`).then(x => setInfo(x.data))
    }, [params])

    return (
        (!edit ?
            <div className={styles['info-container']}>
                <div className={styles['main-info']}>
                    <ul>
                        <li>Town</li>
                        <li>Address</li>
                        <li>Country</li>
                        <li>University</li>
                        <li>University degree</li>
                        <li>School</li>
                    </ul>
                </div>
                <div className={styles['user-info']}>
                    <ul>
                        <li>{info.town === undefined  ? 'No info yet...' : info.town}</li>
                        <li>{info.address === undefined  ? 'No info yet...' : info.address}</li>
                        <li>{info.country === undefined  ? 'No info yet...' : info.country}</li>
                        <li>{info.university === undefined ? 'No info yet...' : info.university}</li>
                        <li>{info.universityDegree === undefined || info.universityDegree === ''  ? 'No info yet...' : info.universityDegree}</li>
                        <li>{info.school === undefined  ? 'No info yet...' : info.school}</li>
                    </ul>
                </div>
                <button className={`${styles['edit-info-btn']} btn btn-outline-light`} onClick={() => { setEdit(true) }}>Edit</button>
            </div>
            :
            <EditInfo params={params} setEdit={setEdit} setInfo={setInfo}/>)
    );
}