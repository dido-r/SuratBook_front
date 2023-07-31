import { CreatePost } from '../Post/CreatePost/CreatePost';
import styles from './Home.module.css'
import { Post } from '../Post/Post';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';

export function Home() {

    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const [end, setEnd] = useState(false);

    useEffect(() => {

        request('get', `api/post/get-all-posts?offset=${offset}&limit=${limit}`).then(x => {

            if (x.data.length < limit) {

                setEnd(true)
            }
            setPosts(current => ([...current, ...x.data]))
        });
    }, [offset]);

    return (

        <div className="d-flex" >
            <div className={styles['card-container']}>

                <CreatePost location={'home'} posts={posts} setPosts={setPosts} />
                <Post posts={posts} setPosts={setPosts} />
                {!end ? <button onClick={() => setOffset(x => x + limit)} className={`${styles['load-more']} btn btn-outline-light`}>Load more</button> : null}
            </div>
            <div className={styles['onl-fr-sc']}>
                <FriendsOnline />
            </div>
        </div>
    );
}