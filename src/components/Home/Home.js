import { CreatePost } from '../Post/CreatePost/CreatePost';
import styles from './Home.module.css'
import { Post } from '../Post/Post';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';

export function Home() {

    const limit = 5;
    let offset = 0;
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        request('get', 'api/post/get-all-posts').then(x => setPosts(x.data));
    }, []);

    const handleScroll = (e) => {

        console.log('yes')
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

        if (bottom) {

            console.log('scroll');
        }
    }

    return (
        <>
            <div className="d-flex" onScroll={(e) => handleScroll(e)}>
                <div className={styles['card-container']} onScroll={(e) => handleScroll(e)}>

                    <CreatePost location={'home'} posts={posts} setPosts={setPosts} />
                    <Post posts={posts} setPosts={setPosts} onScroll={(e) => handleScroll(e)}/>

                </div>
                <div className={`${styles['onl-fr-sc']}`}>
                    <FriendsOnline />
                </div>
            </div>
        </>
    );
}