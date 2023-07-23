import styles from './PhotoSelected.module.css';
import { request } from '../../../services/request';
import { useDropBox } from '../../../hooks/useDropbox';
import { CreateComment } from '../../Comment/CreateComment/CreateComment';
import { Comment } from '../../Comment/Comment';

export function PhotoSelected({
    setSelected,
    selectedSrc,
    pic,
    setPhotos,
    location
}) {

    const { deleteFile } = useDropBox();
    const onCloseModal = () => {
        setSelected(false);
    }

    const onPhotoDelete = async (photo) => {

        let id = photo.id;
        await request('post', 'api/photo/delete', id);
        await deleteFile(photo.filePath);
        setPhotos(current => current.filter(x => x.key !== id));
        setSelected(false);
    }

    return (
        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                <div className='d-flex'>
                    <div className={styles['photo-section']}>
                        <img className={styles['modal-img']} src={selectedSrc} alt="img" />
                        <span className="text-light">{pic.likes} Likes</span>
                        <span className="text-light">{pic.comments} Comments</span>
                    </div>
                    <div className={styles['comment-section']}>
                        {location === 'group' ? <p className={`${styles['post-descr']} text-light`}>{pic.description}</p> : null}
                        <CreateComment />
                        <Comment />
                        <Comment />
                    </div>
                </div>
                <div className={styles['modal-buttons']}>
                    <button className="btn btn-outline-light">Like</button>
                    <button className="btn btn-outline-light">Comment</button>
                    <button className={'btn btn-outline-danger'} onClick={() => onPhotoDelete({ id: pic.key, filePath: pic.dropboxPath })}>Delete</button>
                </div>
            </div>
        </div>
    );
}