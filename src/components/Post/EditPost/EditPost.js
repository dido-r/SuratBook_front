import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { request } from '../../../services/request';
import styles from './EditPost.module.css';

export function EditPost({
    setEdit,
    edit,
    setPosts,
    posts,
    setModal
}) {

    const [error, setError] = useState(false);
    const { values, onChangeHandler, resetValues } = useForm({

        id: edit.id,
        description: '',
    });

    const onEditPost = async (e) => {

        e.preventDefault();
        setError(false);
        let response = await request('post', 'api/post/edit-post', values);
        
        if(response.name === "AxiosError"){
            
            setError(`${response.response.data.message}`);
            return;
        }
        
        resetValues(e);
        updatePosts(edit.id);
        setEdit(null);
    }

    const updatePosts = (id) => {

        const newList = posts.map((x) => {

            if (x.key === id) {

                const updatedItem = {
                    ...x,
                    description: values.description,
                };

                return updatedItem;
            }

            return x;
        });

        setPosts(newList);
    }

    const onclose = () => {

        setEdit(null);
        setModal(false);
    }

    return (
        <div className={styles['modal-background']}>
            <div className={`${styles['edit-post']} card bg-dark bg-gradient`}>
                <div className='card-body'>
                    <span className={styles['close-modal']} onClick={() => onclose()}>&times;</span>
                    <form onSubmit={(e) => onEditPost(e)}>
                        <h4 className={styles['edit-h']}>Edit post</h4><hr />
                        {error !== null ? <div className={styles['error-msg']}>
                            {error}
                        </div> : null}
                        <textarea className={styles['edit-ta']} required="required" name="description" rows="3" placeholder={edit.value} value={values.description} onChange={(e) => onChangeHandler(e)} />
                        <button className={`${styles['post-edit-btn']} btn btn-outline-light`}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    );
}