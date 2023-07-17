import { CreatePost } from '../Post/CreatePost/CreatePost';
import styles from './Home.module.css'
import { Post } from '../Post/Post';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';
import { Modal } from '../Modal/Modal';

export function Home() {

    const [posts, setPosts] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {

        try {

            request('get', 'api/post/get-all-posts').then(x => setPosts(x.data));

        } catch {

            setModal(true);
            return;
        }

    }, []);

    return (
        <>
            {modal ? <Modal message='Could not load posts.' setModal={setModal} /> : null}
            <div className="d-flex">
                <div className={styles['card-container']}>

                    <CreatePost posts={posts} setPosts={setPosts}/>
                    <Post posts={posts} setPosts={setPosts}/>

                </div>
                <div className={`${styles['onl-fr-sc']}`}>
                    <FriendsOnline />
                </div>
            </div>
        </>
    );
}