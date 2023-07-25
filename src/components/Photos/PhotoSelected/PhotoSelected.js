import styles from './PhotoSelected.module.css';
import { request } from '../../../services/request';
import { useDropBox } from '../../../hooks/useDropbox';
import { CreateComment } from '../../Comment/CreateComment/CreateComment';
import { Comment } from '../../Comment/Comment';
import { useCurrentUser } from '../../../hooks/useCookies';

export function PhotoSelected({
    setSelected,
    selectedSrc,
    pic,
    setPhotos,
    location
}) {

    const { deleteFile } = useDropBox();
    const currentUser = useCurrentUser()
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

    const onPhotoLike = async (photoId) => {

        await request('post', 'api/photo/like', photoId)
        setPhotos(current => current.map(x => x.key === photoId ? ({ ...x, likes: x.likes + 1, isLiked: true }) : x));
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
                    {currentUser.userId.toUpperCase() !== pic.ownerId ?
                        !pic.isLiked ? <button className="btn btn-outline-light" onClick={() => onPhotoLike(pic.key)}>Like</button> : null :
                        <button className={'btn btn-outline-danger'} onClick={() => onPhotoDelete({ id: pic.key, filePath: pic.dropboxPath })}>Delete</button>}
                    <button className="btn btn-outline-light">Comment</button>
                </div>
            </div>
        </div>
    );
}