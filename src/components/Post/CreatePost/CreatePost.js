import { useState } from 'react';
import { useDropBox } from '../../../hooks/useDropbox';
import { useForm } from '../../../hooks/useForm';
import styles from './CreatePost.module.css';
import { request } from '../../../services/request';
import { useCurrentUser } from '../../../hooks/useCookies';

export function CreatePost({
    setPosts,
    user,
    location,
    groupData
}) {

    const loggedUser = useCurrentUser();
    const { uploadFile } = useDropBox();
    const [error, setError] = useState(false);

    const { values, onChangeHandler, resetValues } = useForm({

        description: '',
        dropboxPath: null,
        ownerId: '',
        groupId: groupData ? groupData.groupData.id : null
    });


    const onCreatePost = async (e) => {

        e.preventDefault();
        setError(false);

        try {

            let file = e.target.getElementsByTagName('input')[0].files[0];

            if (file !== undefined) {

                let img = await uploadFile(file);
                values.dropboxPath = img['path_display'];
            }
            values.ownerId = loggedUser.userId;
            let result = await request('post', 'api/post/create-post', values);

            if(result.name === "AxiosError"){

                setError(`${result.response.data.message}`);
                return;
            }

            updatePosts(result);
            resetValues(e);

        } catch (error) {

            setError('Something went wrong!');
        }
    }

    const updatePosts = (result) => {

        const newPost = {
            key: result.data,
            description: values.description,
            dropboxPath: values.dropboxPath,
            likes: 0,
            comments: 0,
            ownerId: loggedUser.userId,
            ownerName: loggedUser.userName
        };

        setPosts(current => [newPost, ...current]);
    }

    return (

        <>
            {location === 'home' ? (
                <div className={`${styles['create-post']} card bg-dark bg-gradient`}>
                    <div className='card-body'>
                        <form onSubmit={(e) => onCreatePost(e)}>
                            <h4 className={styles['create-h']}>Create post</h4><hr />
                            {error !== null ? <div className={styles['error-msg']}>
                                {error}
                            </div> : null}
                            <textarea className={styles['create-ta']} required="required" name="description" rows="3" placeholder="Write your post here..." value={values.description} onChange={(e) => onChangeHandler(e)} />
                            <input className={styles['create-file']} type="file" value={values.file} onChange={(e) => onChangeHandler(e)} /><br />
                            <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Submit</button>
                        </form>
                    </div>
                </div>) : null}

            {location === 'profile' ?
                user.id === loggedUser.userId ?
                    (<div className={`${styles['create-post']} card bg-dark bg-gradient`}>
                        <div className='card-body'>
                            <form onSubmit={(e) => onCreatePost(e)}>
                                <h4 className={styles['create-h']}>Create post</h4><hr />
                                {error !== null ? <div className={styles['error-msg']}>
                                    {error}
                                </div> : null}
                                <textarea className={styles['create-ta']} required="required" name="description" rows="3" placeholder="Write your post here..." value={values.description} onChange={(e) => onChangeHandler(e)} />
                                <input className={styles['create-file']} type="file" value={values.file} onChange={(e) => onChangeHandler(e)} /><br />
                                <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Submit</button>
                            </form>
                        </div>
                    </div>) : null : null}

            {location === 'group' ?
                groupData.isMember || groupData.groupData.ownerId === loggedUser.userId.toUpperCase() ?
                    (<div className={`${styles['create-post']} card bg-dark bg-gradient`}>
                        <div className='card-body'>
                            <form onSubmit={(e) => onCreatePost(e)}>
                                <h4 className={styles['create-h']}>Create post</h4><hr />
                                {error !== null ? <div className={styles['error-msg']}>
                                    {error}
                                </div> : null}
                                <textarea className={styles['create-ta']} required="required" name="description" rows="3" placeholder="Write your post here..." value={values.description} onChange={(e) => onChangeHandler(e)} />
                                <input className={styles['create-file']} type="file" value={values.file} onChange={(e) => onChangeHandler(e)} /><br />
                                <button className={`${styles['post-create-btn']} btn btn-outline-light`}>Submit</button>
                            </form>
                        </div>
                    </div>) : null : null}

        </>
    );
}