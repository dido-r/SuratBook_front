import { Link } from "react-router-dom";
import { Comment } from "../Comment/Comment";
import { CreateComment } from "../Comment/CreateComment/CreateComment";
import styles from './Post.module.css';
import { useState } from 'react';
import { PostImage } from "./PostImage/PostImage";

export function Post({
    posts
}) {

    const [showComment, setshowComment] = useState(false);
    
    return (
        <>

            {posts.map(x => (
                <div key={x.key} className={`${styles['home-card']} card bg-dark bg-gradient`}>
                    <Link to={`/user/${x.ownerId}`} className={`${styles['home-card-link']} card-body`}>
                        <img className={styles["card-user-img"]} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <span className={`${styles['card-body-span']} text-light`}>{x.ownerName}</span>
                    </Link>

                    {x.dropboxPath !== null ? 
                    <PostImage path={x.dropboxPath}/> : null}

                    <div className={`${styles['post-body']} card-body`}>
                        <p className="text-light">
                            {x.description}
                        </p>
                        <p className="text-light">{x.likes} Likes {x.comments} Comments</p>
                        <button onClick={() => setshowComment(!showComment)} className="btn btn-outline-light">Comment</button>
                        <button className="btn btn-outline-light">Like</button>
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