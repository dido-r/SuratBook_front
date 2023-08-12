import { Link } from "react-router-dom";
import { Comment } from "../Comment/Comment";
import { CreateComment } from "../Comment/CreateComment/CreateComment";
import styles from './Post.module.css';
import { useState } from 'react';
import { PostImage } from "./PostImage/PostImage";
import { EditPost } from "./EditPost/EditPost";
import { request } from "../../services/request";
import { useCurrentUser } from '../../hooks/useCookies';
import { PostDelete } from "./PostDelete/PostDelete";
import { PostUserImage } from "./PostUserImage/PostUserImage";

export function Post({
    posts,
    setPosts
}) {

    const [showComment, setShowComment] = useState(false);
    const [edit, setEdit] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(undefined);
    const [comments, setComments] = useState([]);
    const currentUser = useCurrentUser()

    const onPostLike = async (id) => {

        await request('post', `api/post/like?postId=${id}`);
        setPosts(current => current.map(x => x.key === id ? ({ ...x, likes: x.likes + 1, isLiked: true }) : x));
    }

    const onCommentSelect = async (postId) => {

        let response = await request('get', `api/comment/get-post-comments?postId=${postId.toLowerCase()}`);
        setComments(response.data);
        setShowComment(current => current !== postId ? postId : false)
    }

    return (
        <>
            {edit ? <EditPost setEdit={setEdit} edit={edit} setPosts={setPosts} posts={posts} /> : null}
            {confirmDelete !== undefined ? <PostDelete postId={confirmDelete} setPosts={setPosts} setConfirmDelete={setConfirmDelete} /> : null}
            {posts.length === 0 ?
                <h4 className='text-light text-center'>No posts yet</h4>
                :
                posts.map(x => (
                    <div key={x.key} className={`${styles['home-card']} card bg-dark bg-gradient`}>
                        <Link to={`/user/${x.ownerId}`} className={`${styles['home-card-link']} card-body`}>
                            <PostUserImage path={x.ownerImage}/>
                            <span className={`${styles['card-body-span']} text-light`}>{x.ownerName}</span>
                        </Link>

                        {x.dropboxPath !== null ?
                            <PostImage path={x.dropboxPath} /> : null}

                        <div className={`${styles['post-body']} card-body`}>
                            <p className="text-light">
                                {x.description}
                            </p>
                            <p className="text-light">{x.likes} Likes {x.comments} Comments</p>
                            <button onClick={() => onCommentSelect(x.key)} className="btn btn-outline-light">Comment</button>

                            {currentUser.userId.toUpperCase() !== x.ownerId ?
                                !x.isLiked ? <button className="btn btn-outline-light" onClick={() => onPostLike(x.key)}>Like</button> : null
                                :
                                <>
                                    <button onClick={() => setEdit({ id: x.key, value: x.description })} className="btn btn-outline-light">Edit</button>
                                    <button onClick={() => setConfirmDelete(x.key)} className="btn btn-outline-light">Delete</button>
                                </>}
                        </div>
                                    
                        {showComment === x.key ?
                            <div className={styles['comment-section']}>
                                <CreateComment location='post' pic={x} setComments={setComments} data={setPosts}/>
                                <Comment comments={comments} />
                            </div>
                            :
                            null
                        }
                    </div>
                ))}
        </>
    );
}