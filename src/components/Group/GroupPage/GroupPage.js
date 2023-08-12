import { useEffect, useState } from "react";
import { Photos } from "../../Photos/Photos";
import { Post } from "../../Post/Post";
import { GroupHeader } from "./GroupHeader/GroupHeader";
import { GroupInfo } from "../GroupInfo/GroupInfo";
import { useParams } from "react-router-dom";
import { request } from "../../../services/request";
import { CreatePost } from '../../Post/CreatePost/CreatePost';
import { Members } from "../Members/Members";
import { useCurrentUser } from "../../../hooks/useCookies";
import { Requests } from "../JoinRequests/Requests";
import { Spinner } from "../../Spinner/Spinner";
import { Modal } from "../../Modal/Modal";

export function GroupPage() {

    const [tag, setTag] = useState('post');
    const [posts, setPosts] = useState([]);
    const [groupData, setGroupData] = useState({});
    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const params = useParams();
    const user = useCurrentUser();

    useEffect(() => {
        try {

            request('get', `api/group/membership?groupId=${params.id}`).then(x => setIsMember(x.data));
            request('get', `api/group/data?groupId=${params.id}`).then(x => setGroupData(x.data));
            request('get', `api/group/posts?groupId=${params.id}`).then(x => {
                setPosts(x.data);
                setLoading(false);
            });
        } catch {

            setModal(true);
        }
    }, [params.id]);

    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <>
                    <CreatePost location={'group'} groupData={{ groupData, isMember }} user={null} setPosts={setPosts} />
                    <Post posts={posts} setPosts={setPosts} />
                </>;
            case 'photos':
                return <Photos location='group' />;
            case 'members':
                return <Members groupId={groupData.id} setLoading={setLoading} />;
            case 'info':
                return <GroupInfo groupData={groupData} setGroupData={setGroupData} />;
            case 'requests':
                return <Requests groupData={groupData} setLoading={setLoading} />;
            default:
                return <>
                    <CreatePost location={'group'} groupData={{ groupData, isMember }} user={null} setPosts={setPosts} />
                    <Post posts={posts} setPosts={setPosts} />
                </>;
        }
    }

    return (
        <>
            {modal ? <Modal setModal={setModal} message='Something went wrong' /> : null}
            <GroupHeader isMember={{ isMember, setIsMember }} groupData={groupData} setTag={setTag} />
            {loading ? <Spinner /> : null}
            {groupData.access === 'Private' ?
                user.userId === groupData.ownerId ? renderSwitch(tag) :
                    isMember ? renderSwitch(tag) : <h5 className="text-light text-center">Only members can view this section</h5> : renderSwitch(tag)}
        </>
    );
}
