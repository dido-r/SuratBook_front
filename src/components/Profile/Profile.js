import { useEffect, useState } from "react";
import { Info } from "../Info/Info";
import { Photos } from "../Photos/Photos";
import { Post } from "../Post/Post";
import { Banner } from "./Banner/Banner";
import { request } from "../../services/request";
import { Modal } from "../Modal/Modal";
import { GroupList } from "../Group/ListOfGroups/GroupList";
import { useParams } from "react-router-dom";
import { CreatePost } from "../Post/CreatePost/CreatePost";
import { Friends } from '../UserList/Friends/Friends';
import { Spinner } from '../Spinner/Spinner';
import styles from './Profile.module.css';

export function Profile() {

    const limit = 5;
    const [offset, setOffset] = useState(0);
    const [tag, setTag] = useState('post');
    const [groupTag, setGroupTag] = useState('');
    const [modal, setModal] = useState(false);
    const [myPosts, setMyPosts] = useState([]);
    const [user, setUser] = useState({});
    const [end, setEnd] = useState(false);
    const [loading, setLoading] = useState(true);
    const param = useParams();    

    useEffect(() => {
        
        setOffset(0);
        setTag('post');
        setGroupTag('');
        setModal(false);
        setMyPosts([]);
        setUser({});
        setEnd(false);
        setLoading(true);

        try {

            request('get', `api/user/get-name?userId=${param.id}`).then(x => setUser(x.data));
            request('get', `api/post/get-my-posts?id=${param.id}&offset=${offset}&limit=${limit}`).then(x => {

                if (x.data.length < limit) {

                    setEnd(true)
                }
                setMyPosts(current => ([...current, ...x.data]));
                setLoading(false)
            });

        } catch {

            setModal(true);
        }
    }, [param.id, offset]);


    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <>
                    <CreatePost location={'profile'} user={user} setPosts={setMyPosts} />
                    {loading ? <Spinner /> :
                        <>
                            <Post posts={myPosts} setPosts={setMyPosts} />
                            {!end ? <button onClick={() => setOffset(x => x + limit)} className={`${styles['load-more']} btn btn-outline-light`}>Load more</button> : null}
                        </>}
                </>;
            case 'photos':
                return <Photos location='photo'/>;
            case 'friends':
                return <Friends />;
            case 'groups':
                return <GroupList tag={groupTag} userId={param.id} />;
            case 'info':
                return <Info />;
            default:
                return <>
                    <CreatePost location={'profile'} user={user} setPosts={setMyPosts} />
                    {loading ? <Spinner /> :
                        <>
                            <Post posts={myPosts} setPosts={setMyPosts} />
                            {!end ? <button onClick={() => setOffset(x => x + limit)} className={`${styles['load-more']} btn btn-outline-light`}>Load more</button> : null}
                        </>}
                </>;
        }
    }

    return (
        <>
            {modal ? <Modal setModal={setModal} /> : null}
            <Banner user={user} setTag={setTag} setGroupTag={setGroupTag} />
            {renderSwitch(tag)}
        </>
    );
}