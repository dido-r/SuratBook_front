import { CreatePost } from '../Post/CreatePost/CreatePost';
import styles from './Home.module.css'
import { Post } from '../Post/Post';
import { FriendsOnline } from './FriendsOnline/FriendsOnline';
import { useEffect, useState } from 'react';
import { request } from '../../services/request';
import { Spinner } from '../Spinner/Spinner';

import { HubConnectionBuilder } from '@microsoft/signalr';
import { useCurrentUser } from '../../hooks/useCookies';

export function Home() {

    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(true);
    const currentUser = useCurrentUser();

    useEffect(() => {

        request('get', `api/post/get-all-posts?offset=${offset}&limit=${limit}`).then(x => {

            if (x.data.length < limit) {

                setEnd(true)
            }
            setPosts(current => ([...current, ...x.data]));
            setLoading(false);
        });
    }, [offset]);

    //HUB
    const [connection, setConnection] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7062/online-users')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        request('get', 'api/user/get-online-users').then(x => setOnlineUsers(x.data));
    }, []);

    useEffect(() => {

        if (connection) {

            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('Online', user => {

                        setOnlineUsers(current => [...current, user]);
                    });

                    connection.on('Offline', userId => {
                        setOnlineUsers(onlineUsers.filter(x => x.id === userId));
                    });

                    setOnline();
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const setOnline = async () => {

        var isOnline = await request('get', 'api/user/is-online');

        if (!isOnline) {

            const user = {
                id: currentUser.userId,
                name: currentUser.userName
            }

            try {
                await connection.send('SetOnline', user, connection.connection.connectionId);
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    // const serOffline = async () => {

    //     try {
    //         await connection.send('SetOffline', currentUser.userId);
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }
    //HUB

    return (

        <div className="d-flex" onScroll={() => console.log('scroll')}>
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
    );
}