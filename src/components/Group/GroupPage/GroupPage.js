import { useState } from "react";
import { Friends } from "../../Friends/Friends";
import { Photos } from "../../Photos/Photos";
import { Post } from "../../Post/Post";
import { GroupHeader } from "./GroupHeader/GroupHeader";
import { GroupInfo } from "../GroupInfo/GroupInfo";

export function GroupPage() {

    const [tag, setTag] = useState('post');
   
    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <Post />;
            case 'photos':
                return <Photos />;
            case 'members':
                return <Friends />;
            case 'info':
                return <GroupInfo />;
            default:
                return <Post />;
        }
    }

    return (
        <>
            <GroupHeader  setTag={setTag}/>
            {renderSwitch(tag)}
        </>
    );
}
