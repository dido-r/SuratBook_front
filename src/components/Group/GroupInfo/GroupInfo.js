import { useState } from 'react';
import styles from './GroupInfo.module.css';
import { EditGroupInfo } from './EditGroupInfo/EditGroupInfo';

export function GroupInfo() {

    const [edit, setEdit] = useState(false)

    return (
        (!edit ?
            <div className={styles['info-container']}>
                <div className={styles['main-info']}>
                    <ul>
                        <li>Name</li>
                        <li>Description</li>
                    </ul>
                </div>
                <div className={styles['user-info']}>
                    <ul>
                        <li>Name INFO</li>
                        <li>Description INFO</li>
                    </ul>
                </div>
                <button className={`${styles['edit-info-btn']} btn btn-outline-light`} onClick={() => { setEdit(true) }}>Edit</button>
            </div>
            :
            <EditGroupInfo setEdit={setEdit} />)
    );
}