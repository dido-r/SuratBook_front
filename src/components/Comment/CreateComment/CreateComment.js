import { request } from '../../../services/request';
import styles from './CreateComment.module.css';
import { useForm } from '../../../hooks/useForm';
import { useState } from 'react';

export function CreateComment({
    pic,
    location,
    setComments,
    data
}) {

    const [error, setError] = useState(undefined);
    const { values, onChangeHandler, resetValues } = useForm({

        content: '',
        photoId: pic.key
    });

    const onCreateComment = async (e) => {

        e.preventDefault();
        setError(undefined);
        const uri = location === 'photo' ? 'api/comment/comment-photo' : 'api/comment/comment-post';
        let response = await request('post', uri, values);

        if (response.name === "AxiosError") {

            setError(`${response.response.data.message}`);

        } else {

            var newComment = {
                id: response.data.id,
                content: response.data.content,
                ownerId: response.data.ownerId,
                ownerName: response.data.ownerName,
                ownerImage: response.data.ownerImage,
            }
            
            setComments(current => [newComment, ...current]);
            data(current => current.map(x => x.key === pic.key ? ({ ...x, comments: x.comments + 1}) : x));
            resetValues(e);
        }
    }

    return (
        <>
            <div className={styles['create-comment']}>
                <hr className={styles['comment-hr']} />
                {error !== undefined ? <div className={styles['error-msg']}>
                    {error}
                </div> : null}
                <form className={styles['comment-form']} onSubmit={(e) => onCreateComment(e)}>
                    <input className={styles['create-input']} required='required' type="text" name="content" placeholder="Enter a comment..." value={values.content} onChange={(e) => onChangeHandler(e)} />
                </form>
                <hr className={styles['comment-hr']} />
            </div>
        </>
    );
}