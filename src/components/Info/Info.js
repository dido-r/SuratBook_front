import { useState } from 'react';
import { EditInfo } from './EditInfo/EditInfo';
import styles from './Info.module.css';

export function Info() {

    const [edit, setEdit] = useState(false)

    return (
        (!edit ?
            <div className={styles['info-container']}>
                <div className={styles['main-info']}>
                    <ul>
                        <li>Name</li>
                        <li>Born</li>
                        <li>Town</li>
                        <li>Address</li>
                        <li>Country</li>
                        <li>University</li>
                        <li>University degree</li>
                        <li>School</li>
                    </ul>
                </div>
                <div className={styles['user-info']}>
                    <ul>
                        <li>Name INFO</li>
                        <li>Born INFO</li>
                        <li>Town INFO</li>
                        <li>Address INFO</li>
                        <li>Country INFO</li>
                        <li>University INFO</li>
                        <li>University degree INFO</li>
                        <li>School INFO</li>
                    </ul>
                </div>
                <button className={`${styles['edit-info-btn']} btn btn-outline-light`} onClick={() => { setEdit(true) }}>Edit</button>
            </div>
            :
            <EditInfo setEdit={setEdit} />)
    );
}