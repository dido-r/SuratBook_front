import { Link } from "react-router-dom";
import { Comment } from "../Comment/Comment";
import { CreateComment } from "../Comment/CreateComment/CreateComment";
import styles from './Post.module.css';
import { useState } from 'react';
import { PostImage } from "./PostImage/PostImage";
import { EditPost } from "./EditPost/EditPost";
import { request } from "../../services/request";
import { Modal } from "../Modal/Modal";

export function Post({
    posts,
    setPosts
}) {

    const [showComment, setshowComment] = useState(false);
    const [edit, setEdit] = useState(null);
    const [modal, setModal] = useState(false);

    const onPostDelete = async (id) => {

        console.log(id)
        try {

            await request('post', 'api/post/delete-post', { id });
            setPosts((current) => current.filter(x => x.key !== id));

        } catch {

            setModal(true);
        }
    }

    return (
        <>
            {edit ? <EditPost setModal={setModal} setEdit={setEdit} edit={edit} setPosts={setPosts} posts={posts} /> : null}
            {modal ? <Modal message='Something went wrong' setModal={setModal} /> : null}
            {posts.map(x => (
                <div key={x.key} className={`${styles['home-card']} card bg-dark bg-gradient`}>
                    <Link to={`/user/${x.ownerId}`} className={`${styles['home-card-link']} card-body`}>
                        <img className={styles["card-user-img"]} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <span className={`${styles['card-body-span']} text-light`}>{x.ownerName}</span>
                    </Link>

                    {x.dropboxPath !== null ?
                        <PostImage path={x.dropboxPath} /> : null}

                    <div className={`${styles['post-body']} card-body`}>
                        <p className="text-light">
                            {x.description}
                        </p>
                        <p className="text-light">{x.likes} Likes {x.comments} Comments</p>
                        <button onClick={() => setshowComment(!showComment)} className="btn btn-outline-light">Comment</button>
                        <button className="btn btn-outline-light">Like</button>
                        <button onClick={() => setEdit({ id: x.key, value: x.description })} className="btn btn-outline-light">Edit</button>
                        <button onClick={() => onPostDelete(x.key)} className="btn btn-outline-light">Delete</button>
                    </div>

                    {showComment ?
                        <div>
                            <CreateComment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>
                        :
                        null
                    }
                </div>
            ))}
        </>
    );
}