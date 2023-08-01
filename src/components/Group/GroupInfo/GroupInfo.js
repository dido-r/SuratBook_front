import { useState } from 'react';
import styles from './GroupInfo.module.css';
import { EditGroupInfo } from './EditGroupInfo/EditGroupInfo';
import { useCurrentUser } from '../../../hooks/useCookies';

export function GroupInfo({
    groupData,
    setGroupData
}) {

    const [edit, setEdit] = useState(false);
    const user = useCurrentUser();

    return (
        (!edit ?
            <div className={`${styles['info-container']} bg-dark bg-gradient`}>
                <div className={styles['main-info']}>
                    <ul>
                        <li>Name</li>
                        <li>Description</li>
                    </ul>
                </div>
                <div className={styles['user-info']}>
                    <ul>
                        <li>{groupData.name}</li>
                        <li>{groupData.groupInfo}</li>
                    </ul>
                </div>
                {user.userId === groupData.ownerId ? <button className={`${styles['edit-info-btn']} btn btn-outline-light`} onClick={() => { setEdit(true) }}>Edit</button> : null}
            </div>
            :
            <EditGroupInfo user={user} groupData={groupData} setGroupData={setGroupData} setEdit={setEdit} />)
    );
}