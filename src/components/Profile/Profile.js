import { useEffect, useState } from "react";
import { Info } from "../Info/Info";
import { GroupList } from "../ListOfGroups/GroupList";
import { UserList } from "../UserList/UserList";
import { Photos } from "../Photos/Photos";
import { Post } from "../Post/Post";
import { Banner } from "./Banner/Banner";
import { request } from "../../services/request";
import { Modal } from "../Modal/Modal";

export function Profile() {

    const [tag, setTag] = useState('post');
    const [modal, setModal] = useState(false);
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {

        try {

            request('get', 'api/post/get-my-posts').then(x => setMyPosts(x.data));

        } catch {

            setModal(true);
        }
    }, []);


    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <Post posts={myPosts} setPosts={setMyPosts} />;
            case 'photos':
                return <Photos />;
            case 'friends':
                return <UserList />;
            case 'groups':
                return <GroupList />;
            case 'info':
                return <Info />;
            default:
                return <Post />;
        }
    }

    return (
        <>
            {modal ? <Modal setModal={setModal} /> : null}
            <Banner setTag={setTag} />
            {renderSwitch(tag)}
        </>
    );
}