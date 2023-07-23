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
import { Friends } from '../Friends/Friends';

export function Profile() {

    const [tag, setTag] = useState('post');
    const [groupTag, setGroupTag] = useState('');
    const [modal, setModal] = useState(false);
    const [myPosts, setMyPosts] = useState([]);
    const [user, setUser] = useState({});
    const param = useParams()

    useEffect(() => {

        try {

            request('get', `api/user/get-name?userId=${param.id}`).then(x => setUser(x.data));
            request('get', `api/post/get-my-posts?id=${param.id}`).then(x => setMyPosts(x.data));

        } catch {

            setModal(true);
        }
    }, [param.id]);


    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <><CreatePost location={'profile'} user={user} setPosts={setMyPosts}/><Post posts={myPosts} setPosts={setMyPosts} /></>;
            case 'photos':
                return <Photos />;
            case 'friends':
                return <Friends />;
            case 'groups':
                return <GroupList tag={groupTag} userId={param.id}/>;
            case 'info':
                return <Info />;
            default:
                return <><CreatePost location={'profile'} user={user} setPosts={setMyPosts}/><Post posts={myPosts} setPosts={setMyPosts} /></>;
        }
    }

    return (
        <>
            {modal ? <Modal setModal={setModal} /> : null}
            <Banner user={user} setTag={setTag} setGroupTag={setGroupTag}/>
            {renderSwitch(tag)}
        </>
    );
}