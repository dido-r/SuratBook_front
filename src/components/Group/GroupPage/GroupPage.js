import { useEffect, useState } from "react";
import { Photos } from "../../Photos/Photos";
import { Post } from "../../Post/Post";
import { GroupHeader } from "./GroupHeader/GroupHeader";
import { GroupInfo } from "../GroupInfo/GroupInfo";
import { useParams } from "react-router-dom";
import { request } from "../../../services/request";
import { CreatePost } from '../../Post/CreatePost/CreatePost';
import { Members } from "../Members/Members";

export function GroupPage() {

    const [tag, setTag] = useState('post');
    const [posts, setPosts] = useState([]);
    const [groupData, setGroupData] = useState({});
    const [isMember, setIsMember] = useState(false);    
    const params = useParams();

    useEffect(() => {
        request('get', `api/group/membership?groupId=${params.id}`).then(x => setIsMember(x.data));
        request('get', `api/group/data?groupId=${params.id}`).then(x => setGroupData(x.data));
        request('get', `api/group/posts?groupId=${params.id}`).then(x => setPosts(x.data));
    },[params.id]);
   
    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <><CreatePost location={'group'} groupData={{groupData, isMember}} user={null} setPosts={setPosts}/><Post posts={posts} setPosts={setPosts}/></>;
            case 'photos':
                return <Photos location='group'/>;
            case 'members':
                return <Members groupId={groupData.id}/>;
            case 'info':
                return <GroupInfo groupData={groupData} setGroupData={setGroupData}/>;
            default:
                return <Post />;
        }
    }

    return (
        <>
            <GroupHeader isMember={{isMember, setIsMember}} groupData={groupData} setTag={setTag}/>
            {renderSwitch(tag)}
        </>
    );
}
