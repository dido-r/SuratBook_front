import { useState } from 'react';
import styles from './UploadPhoto.module.css';

export function UploadPhoto({ setUpload }) {

    const [source, setSource] = useState(null);

    const onUploadSubmit = (e) => {
        e.preventDefault();
        setUpload(false);
        setSource(null)
    }

    const onCloseModal = () => {
        setUpload(false);
        setSource(null);
    }

    function showPreview(e) {

        if (e.target.files.length > 0) {
            setSource(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className={styles['modal-background']}>
            <div className={`${styles['home-card']} card bg-dark bg-gradient`}>
                <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                <div className="card-body">
                    <form onSubmit={(e) => onUploadSubmit(e)}>
                        <h4 className={styles['create-h']}>Upload photo</h4><hr />
                        {source !== null ? <img className={styles['img-previw']} src={source} alt="img" /> : null}
                        <input onChange={(e) => showPreview(e)} className={styles['create-file']} type="file" /><br />
                        <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Upload</button>
                    </form>
                </div>
            </div>
        </div>            );
}