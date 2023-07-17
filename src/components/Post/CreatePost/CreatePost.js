import { useState } from 'react';
import { useDropBox } from '../../../hooks/useDropbox';
import { useForm } from '../../../hooks/useForm';
import styles from './CreatePost.module.css';
import { Modal } from '../../Modal/Modal';
import { request } from '../../../services/request';
import { useCurrentUser } from '../../../hooks/useCookies';

export function CreatePost({
    setPosts,
    posts
}) {

    const user = useCurrentUser();

    const { values, onChangeHandler, resetValues } = useForm({

        description: '',
        dropboxPath: null,
        ownerId: ''
    });

    const { uploadFile } = useDropBox();
    const [modal, setModal] = useState(false);

    const onCreatePost = async (e) => {

        e.preventDefault();

        try {

            let file = e.target.getElementsByTagName('input')[0].files[0];
            
            if(file !== undefined){

                let img = await uploadFile(file);
                values.dropboxPath = img['path_display'];
            }
            values.ownerId = user.userId;
            let result = await request('post', 'api/post/create-post', values);
            updatePosts(result);
            resetValues(e);
            
        } catch (error) {

            setModal(true);
        }
    }

    const updatePosts = (result) => {

        const newPost = {
            key: result.data,
            description: values.description,
            dropboxPath: values.dropboxPath,
            likes: 0,
            comments: 0,
            ownerId: user.userId,
            ownerName: user.userName
        };
        
        setPosts(current => [newPost, ...current]);
    }

    return (

        <>
            {modal ? <Modal message = 'Could not upload the file or create the post. Please try again or contact support.' setModal={setModal}/> : null}
            <div className={`${styles['create-post']} card bg-dark bg-gradient`}>
                <div className='card-body'>
                    <form onSubmit={(e) => onCreatePost(e)}>
                        <h4 className={styles['create-h']}>Create post</h4><hr />
                        <textarea className={styles['create-ta']} name="description" rows="3" placeholder="Write your post here..." value={values.description} onChange={(e) => onChangeHandler(e)} />
                        <input className={styles['create-file']} type="file" value={values.file} onChange={(e) => onChangeHandler(e)}/><br />
                        <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}