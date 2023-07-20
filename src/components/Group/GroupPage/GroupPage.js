import { useEffect, useState } from "react";
import { Friends } from "../../Friends/Friends";
import { Photos } from "../../Photos/Photos";
import { Post } from "../../Post/Post";
import { GroupHeader } from "./GroupHeader/GroupHeader";
import { GroupInfo } from "../GroupInfo/GroupInfo";
import { useParams } from "react-router-dom";
import { request } from "../../../services/request";
import { CreatePost } from '../../Post/CreatePost/CreatePost';

export function GroupPage() {

    const [tag, setTag] = useState('post');
    const [posts, setPosts] = useState([]);
    const [groupData, setGroupData] = useState({});
    const params = useParams();

    useEffect(() => {
        request('get', `api/group/data?groupId=${params.id}`).then(x => setGroupData(x.data));
        request('get', `api/group/posts?groupId=${params.id}`).then(x => setPosts(x.data));
    },[params.id]);
   
    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <><CreatePost setPosts={setPosts}/><Post posts={posts} setPosts={setPosts}/></>;
            case 'photos':
                return <Photos />;
            case 'members':
                return <Friends />;
            case 'info':
                return <GroupInfo groupData={groupData} setGroupData={setGroupData}/>;
            default:
                return <Post />;
        }
    }

    return (
        <>
            <GroupHeader groupData={groupData} setTag={setTag}/>
            {renderSwitch(tag)}
        </>
    );
}
