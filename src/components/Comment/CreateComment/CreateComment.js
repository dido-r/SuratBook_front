import { request } from '../../../services/request';
import styles from './CreateComment.module.css';
import { useForm } from '../../../hooks/useForm';
import { useState } from 'react';
import { Modal } from '../../Modal/Modal';

export function CreateComment({
    pic,
    location,
    setComments
}) {

    const [modal, setModal] = useState(false);
    const { values, onChangeHandler, resetValues } = useForm({

        content: '',
        photoId: pic.key
    });

    const onCreateComment = async (e) => {

        e.preventDefault();
        const uri = location === 'photo' ? 'api/photo/comment' : 'api/post/comment';

        try{

            let response = await request('post', uri, values);

            var newComment = {
                id: response.data.id,
                content: response.data.content,
                ownerId: response.data.ownerId,
                ownerName: response.data.ownerName,
            }
            setComments(current => [newComment, ...current]);
        }catch{
            setModal(true);
        }
        resetValues(e);
    }

    return (
        <>
        {modal ? <Modal setModal={setModal}/> : null}
        <div className={styles['create-comment']}>
            <hr className={styles['comment-hr']} />
                <form className={styles['comment-form']} onSubmit={(e) => onCreateComment(e)}>
                    <input className={styles['create-input']} type="text" name="content" placeholder="Enter a comment..." value={values.content} onChange={(e) => onChangeHandler(e)}/>
                </form>
            <hr className={styles['comment-hr']} />
        </div>
        </>
    );
}