import { useState } from 'react';
import { request } from '../../../services/request';
import styles from './PostDelete.module.css';

export function PostDelete({
    setConfirmDelete,
    postId,
    setPosts
}) {

    const [error, setError] = useState(false);
    const onCloseModal = () => {
        setConfirmDelete(undefined);
    }

    const onPostDelete = async (postId) => {

        setError(false);
        let result = await request('post', `api/post/delete-post?postId=${postId}`);
        result.name === "AxiosError" ? setError(true) :
            setPosts((current) => current.filter(x => x.key !== postId));
        setConfirmDelete(undefined);
    }

    return (
        <div className={styles['modal-background']}>
            <div className={styles['modal-content']}>
                {error ? <div className={styles['error-msg']}>
                    Something went wrong!
                </div> : null}
                <p>Are you sure you want to delete this post?</p>
                <button onClick={() => onPostDelete(postId)} className='btn btn-outline-dark'>Yes</button>
                <button onClick={onCloseModal} className='btn btn-outline-dark'>No</button>
            </div>
        </div>

    );
}