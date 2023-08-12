import { useState } from 'react';
import styles from './UploadPhoto.module.css';
import { useDropBox } from '../../../hooks/useDropbox';
import { useCurrentUser } from '../../../hooks/useCookies';
import { request } from '../../../services/request';
import { Spinner } from '../../Spinner/Spinner';

export function UploadPhoto({
    setUpload,
    setPhotos
}) {

    const { uploadFile } = useDropBox();
    const user = useCurrentUser();
    const [source, setSource] = useState(null);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const onUploadSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            let file = e.target.getElementsByTagName('input')[0].files[0];

            if (file !== undefined) {

                let img = await uploadFile(file);
                let dropboxPath = img['path_display'];
                let dropboxId = img.id;
                let ownerId = user.userId.toUpperCase();
                let photoId = await request('post', 'api/photo/upload', { dropboxPath, dropboxId, ownerId });

                if (photoId.name === 'AxiosError') {

                    setError(`${photoId.response.data.message}`);
                } else {

                    let newPhoto = {
                        key: photoId.data,
                        dropboxPath,
                        dropboxId,
                        ownerId,
                        likes: 0,
                        comments: 0
                    }
                    
                    setPhotos(current => [newPhoto, ...current]);
                    onCloseModal();
                }
            }
            else {

                setError('Please select photo');
            }

        } catch (error) {

            setError('Could not upload the photo');
        }

        setLoading(false);
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
        <>
            <div className={styles['modal-background']}>
                <div className={`${styles['home-card']} card bg-dark bg-gradient`}>
                    <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                    <div className="card-body">
                        <form onSubmit={(e) => onUploadSubmit(e)}>
                            <h4 className={styles['create-h']}>Upload photo</h4><hr />
                            {error !== undefined ? <div className={styles['error-msg']}>{error}</div> : null}
                            {source !== null ? <img className={styles['img-previw']} src={source} alt="img" /> : null}
                            <input onChange={(e) => showPreview(e)} className={styles['create-file']} type="file" /><br />
                            {loading ? <Spinner /> : <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Upload</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>);
}