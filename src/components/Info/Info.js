import { useEffect, useState } from 'react';
import { EditInfo } from './EditInfo/EditInfo';
import styles from './Info.module.css';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCookies';
import { Spinner } from '../Spinner/Spinner';
import { Modal } from '../Modal/Modal';

export function Info() {

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({});
    const [modal, setModal] = useState(false);
    const params = useParams();
    const user = useCurrentUser()

    useEffect(() => {

        try{

            request('get', `api/user/info?userId=${params.id}`).then(x => {
                setInfo(x.data);
                setLoading(false);
            });
        }catch{
            
            setModal(true);
        }
    }, [params])

    return (
        <>
            {modal ? <Modal setModal={setModal} message='Something went wrong'/> : null}
            {!edit ?
            <div className={`${styles['info-container']} bg-dark bg-gradient`}>
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
                <div className={`${styles['user-info']} text-light`}>
                    {loading ? <ul><Spinner /></ul> :
                        <ul>
                            <li>{info.town === null || info.town === '' ? 'No info yet...' : info.town}</li>
                            <li>{info.address === null || info.address === '' ? 'No info yet...' : info.address}</li>
                            <li>{info.country === null || info.country === '' ? 'No info yet...' : info.country}</li>
                            <li>{info.university === null || info.university === '' ? 'No info yet...' : info.university}</li>
                            <li>{info.universityDegree === null || info.universityDegree === '' ? 'No info yet...' : info.universityDegree}</li>
                            <li>{info.school === null || info.school === '' ? 'No info yet...' : info.school}</li>
                        </ul>}
                </div>
                {user.userId === params.id ? <button className={`${styles['edit-info-btn']} btn btn-outline-light`} onClick={() => { setEdit(true) }}>Edit</button> : null}
            </div>
            :
            <EditInfo info={info} setEdit={setEdit} setInfo={setInfo} />}
        </>
    );
}