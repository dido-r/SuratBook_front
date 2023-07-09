import { Link } from "react-router-dom";
import { Comment } from "../Comment/Comment";
import { CreateComment } from "../Comment/CreateComment/CreateComment";
import styles from './Post.module.css';
import { useState } from 'react';

export function Post() {

    const [showComment, setshowComment] = useState(false);

    return (

        <div className={`${styles['home-card']} card bg-dark bg-gradient`}>
            <Link to='/user/1' className= {`${styles['home-card-link']} card-body`}>
                <img className={styles["card-user-img"]} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                <span className={`${styles['card-body-span']} text-light`}>Username</span>
            </Link>

            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1175px-Test-Logo.svg.png?20150906031702"
                className="card-img-top" alt="..." />

            <div className="card-body">
                <p className="text-light">0 Likes 0 Comments</p>
                <h5 className="card-title text-light">Card title</h5>
                <p className="text-light">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                </p>
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
        </div>);
}