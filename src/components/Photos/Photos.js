import { useEffect, useState } from 'react';
import styles from './Photos.module.css';
import { UploadPhoto } from './UploadImg/UploadPhoto';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';
import { Photo } from './SinglePhoto/Photo';
import { Modal } from '../Modal/Modal';
import { useCurrentUser } from '../../hooks/useCookies';

export function Photos({
    location
}) {

    const params = useParams();
    const user = useCurrentUser()
    const [modal, setModal] = useState(false);
    const [upload, setUpload] = useState(false);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {

        try {

            location === 'group' ? request('get', `api/group/get-media?id=${params.id}`).then(x => setPhotos(x.data)) : request('get', `api/photo/get-photos?id=${params.id}`).then(x => setPhotos(x.data));

        } catch {

            setModal(true);
        }
    }, [params.id, location]);

    return (
        <>
            <div className={styles['add-photo']}>
                {user.userId === params.id ? <button onClick={() => setUpload(true)} className={`${styles['add-photo-btn']} btn btn-outline-light`}>Upload photo</button> : null}
            </div>
            {modal ? <Modal message={'Could not load photos.'} setModal={setModal} /> : null}
            {upload ? <UploadPhoto setUpload={setUpload} setPhotos={setPhotos} /> : null}
            {photos.length === 0 ?
                <h4 className='text-light text-center'>No photos</h4> :
                <div className={styles['images-container']}>
                    {photos.map(x => <Photo key={x.key} location={location} setPhotos={setPhotos} pic={x} />)}
                </div>}
        </>);
}