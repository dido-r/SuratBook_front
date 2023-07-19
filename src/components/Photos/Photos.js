import { useEffect, useState } from 'react';
import styles from './Photos.module.css';
import { UploadPhoto } from './UploadImg/UploadPhoto';
import { request } from '../../services/request';
import { useParams } from 'react-router-dom';
import { Photo } from './SinglePhoto/Photo';
import { Modal } from '../Modal/Modal';

export function Photos() {

    const params = useParams();
    const [modal, setModal] = useState(false);
    const [upload, setUpload] = useState(false);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {

        try {

            request('get', `api/photo/get-photos?id=${params.id}`).then(x => setPhotos(x.data));

        } catch {

            setModal(true);
        }
    }, [params.id]);

    return (
        <>
            <div className={styles['add-photo']}>
                <button onClick={() => setUpload(true)} className={`${styles['add-photo-btn']} btn btn-outline-light`}>Upload photo</button>
            </div>
            {modal ? <Modal message={'Could not load photos.'} setModal={setModal} /> : null}
            {upload ? <UploadPhoto setUpload={setUpload} setPhotos={setPhotos}/> : null}
            <div className={styles['images-container']}>
                {photos.map(x => <Photo key={x.key} setPhotos={setPhotos} pic={x}/>)}
            </div>
        </>);
}