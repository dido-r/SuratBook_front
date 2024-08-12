import { CreatePost } from '../Post/CreatePost/CreatePost';
import styles from './Home.module.css'
import { Post } from '../Post/Post';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';
import { Spinner } from '../Spinner/Spinner';
import { useCurrentUser } from '../../hooks/useCookies';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, fetchOnlineUsers } from '../../store/onlineUsers'

export function Home() {

    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(true);
    const currentUser = useCurrentUser();
    const connection = useSelector(state => state.connection.connection);
    const onlineUsers = useSelector(state => state.onlineUsers.list);
    const dispatch = useDispatch()

    useEffect(() => {

        request('get', `api/post/get-all-posts?offset=${offset}&limit=${limit}`).then(x => {

            if (x.data.length < limit) {

                setEnd(true)
            }
            setPosts(current => ([...current, ...x.data]));
            setLoading(false);
        });
    }, [offset]);

    useEffect(() => {
        dispatch(fetchOnlineUsers());

        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('Online', user => {
                        dispatch(add(user))
                    });

                    connection.on('Offline', userId => {
                        dispatch(remove(userId))
                    });

                    setOnline();
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const setOnline = async () => {

        var isOnline = await request('get', 'api/user/is-online');

        if (!isOnline.data) {

            const user = {
                id: currentUser.userId,
                name: currentUser.userName
            }

            try {
                await request('post', 'api/user/set-online')
                await connection.send('SetOnline', user, connection.connection.connectionId);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <div className={styles['flex-container']} onScroll={() => console.log('scroll')}>
                <div className={styles['card-container']}>
                    <CreatePost location={'home'} posts={posts} setPosts={setPosts} />
                    {loading ? <Spinner /> :
                        <>
                            <Post posts={posts} setPosts={setPosts} />
                            {!end ? <button onClick={() => setOffset(x => x + limit)} className={`${styles['load-more']} btn btn-outline-light`}>Load more</button> : null}
                        </>}
                </div>
                <div className={styles['onl-fr-sc']}>
                    <FriendsOnline onlineUsers={onlineUsers} />
                </div>
            </div>
        </div>
    );
}