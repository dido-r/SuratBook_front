import { CreatePost } from '../Post/CreatePost/CreatePost';
import styles from './Home.module.css'
import { Post } from '../Post/Post';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';

export function Home() {


    return (

        <div className="d-flex">
            <div className={styles['card-container']}>

                <CreatePost />
                <Post/>
                <Post/>
                <Post/>
                
            </div>
            <div className={`${styles['onl-fr-sc']}`}>
                <FriendsOnline/>
            </div>
        </div>
    );
}