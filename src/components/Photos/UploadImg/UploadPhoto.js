import { useState } from 'react';
import styles from './UploadPhoto.module.css';
import { Modal } from '../../Modal/Modal';
import { useForm } from '../../../hooks/useForm';
import { useDropBox } from '../../../hooks/useDropbox';
import { useCurrentUser } from '../../../hooks/useCookies';
import { request } from '../../../services/request';

export function UploadPhoto({
    setUpload,
    setPhotos
}) {

    const { resetValues } = useForm(null);
    const { uploadFile } = useDropBox();
    const user = useCurrentUser();
    const [source, setSource] = useState(null);
    const [modal, setModal] = useState(false);

    const onUploadSubmit = async (e) => {
        e.preventDefault();

        try {

            let file = e.target.getElementsByTagName('input')[0].files[0];

            if (file !== undefined) {

                let img = await uploadFile(file);
                let dropboxPath = img['path_display'];
                let isExisting = await request('get', `api/photo/exist?path=${dropboxPath}`);

                if (!isExisting.data) {
                    let dropboxId = img.id;
                    let ownerId = user.userId;
                    let photoId = await request('post', 'api/photo/upload', { dropboxPath, dropboxId, ownerId });
                    let newPhoto = {
                        key: photoId,
                        dropboxPath,
                        dropboxId,
                        ownerId
                    }
                    setPhotos(current => [newPhoto, ...current]);
                    onCloseModal();
                    resetValues(e);
                    
                }else{

                    setModal(true);
                }
            }

        } catch (error) {

            setModal(true);
        }

        onCloseModal();
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
            {modal ? <Modal message='Something went wrong or the file already exist.' setModal={setModal} /> : null}
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
            </div>
        </>);
}