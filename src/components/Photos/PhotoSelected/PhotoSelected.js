import styles from './PhotoSelected.module.css';
import { request } from '../../../services/request';
import { CreateComment } from '../../Comment/CreateComment/CreateComment';
import { Comment } from '../../Comment/Comment';
import { useCurrentUser } from '../../../hooks/useCookies';
import { useEffect, useState } from 'react';
import { useDropBox } from '../../../hooks/useDropbox';

export function PhotoSelected({
    setSelected,
    selectedSrc,
    pic,
    setPhotos,
    location
}) {

    const currentUser = useCurrentUser();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(undefined);
    const { deleteFile } = useDropBox();
    const onCloseModal = () => {
        setSelected(false);
    }

    useEffect(() => {
        request('get', `api/comment/get-photo-comments?photoId=${pic.key.toLowerCase()}`).then(x => setComments(x.data));
    }, [pic.key]);

    const onPhotoLike = async (photoId) => {

        await request('post', 'api/photo/like', photoId)
        setPhotos(current => current.map(x => x.key === photoId ? ({ ...x, likes: x.likes + 1, isLiked: true }) : x));
    }

    const onSetAsProfile = async (dropboxPath) => {

        await request('post', 'api/photo/set-as-profile', dropboxPath);
        setSelected(false);
    }

    const onPhotoDelete = async (photo) => {

        let id = photo.id;
        let response = await request('post', 'api/photo/delete', id);

        if (response.name === "AxiosError") {

            setError(`${response.response.data.message}`);
        } else {

            await deleteFile(photo.filePath);
            setPhotos(current => current.filter(x => x.key !== id));
            setSelected(false);
        }
    }

    return (

        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                <span className={styles['close-modal']} onClick={onCloseModal}>&times;</span>
                <div className='d-flex flex-wrap'>
                    <div className={styles['photo-section']}>
                        <img className={styles['modal-img']} src={selectedSrc} alt="img" />
                        <span className="text-light">{pic.likes} Likes</span>
                        <span className="text-light">{pic.comments} Comments</span>
                        <div className={styles['modal-buttons']}>
                            {error !== null ? <div className={styles['error-msg']}>
                                {error}
                            </div> : null}
                            {currentUser.userId !== pic.ownerId.toLowerCase() ?
                                !pic.isLiked ? <button className="btn btn-outline-light" onClick={() => onPhotoLike(pic.key)}>Like</button> : null :
                                <>
                                <button className={'btn btn-outline-danger'} onClick={() => onPhotoDelete({ id: pic.key, filePath: pic.dropboxPath })}>Delete</button>
                                <button className={'btn btn-outline-light'} onClick={() => onSetAsProfile(pic.dropboxPath)}>Set as profile</button>
                                </>}
                        </div>
                    </div>
                    <div className={styles['comment-section']}>
                        {location === 'group' ? <p className={`${styles['post-descr']} text-light`}>{pic.description}</p> : null}
                        <CreateComment location='photo' pic={pic} setComments={setComments} data={setPhotos}/>
                        <Comment comments={comments} />
                    </div>
                </div>
            </div>
        </div>
    );
}