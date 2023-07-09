import { useState } from 'react';
import { PhotoSelected } from '../PhotoSelected/PhotoSelected';
import styles from './Photos.module.css';
import { UploadPhoto } from './UploadImg/UploadPhoto';

export function Photos() {

    const [modal, setModal] = useState(false);
    const [upload, setUpload] = useState(false);

    return (
        <>
            <div className={styles['add-photo']}>
                <button onClick={() => setUpload(true)} className={`${styles['add-photo-btn']} btn btn-outline-light`}>Upload photo</button>
            </div>
            {modal ? <PhotoSelected setModal={setModal} /> : null}
            {upload ? <UploadPhoto setUpload={setUpload} /> : null}
            <div className={styles['images-container']}>
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
                <img className={styles['user-list-img']} src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt="img" onClick={() => { setModal(true) }} />
            </div>
        </>);
}