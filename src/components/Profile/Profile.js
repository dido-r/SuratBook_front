import { useState } from "react";
import { Info } from "../Info/Info";
import { GroupList } from "../ListOfGroups/GroupList";
import { UserList } from "../UserList/UserList";
import { Photos } from "../Photos/Photos";
import { Post } from "../Post/Post";
import { Banner } from "./Banner/Banner";

export function Profile() {

    const [tag, setTag] = useState('post');

    const renderSwitch = (tag) => {
        switch (tag) {
            case 'post':
                return <Post />;
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
            <Banner setTag={setTag} />
            {renderSwitch(tag)}
        </>     
    );
}