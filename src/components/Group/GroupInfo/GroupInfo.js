import { useState } from 'react';
import styles from './GroupInfo.module.css';
import { EditGroupInfo } from './EditGroupInfo/EditGroupInfo';

export function GroupInfo({
    groupData,
    setGroupData
}) {

    const [edit, setEdit] = useState(false)

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
                <button className={`${styles['edit-info-btn']} btn btn-outline-light`} onClick={() => { setEdit(true) }}>Edit</button>
            </div>
            :
            <EditGroupInfo setGroupData={setGroupData} setEdit={setEdit} />)
    );
}