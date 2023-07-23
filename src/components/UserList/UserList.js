import { useState } from 'react';
import styles from './UserList.module.css';
import { Suggestions } from './Suggestions/Suggestions';
import { SentRequests } from './SentRequests/SentRequests';
import { Invitations } from './Invitations/Invitations';

export function UserList() {

    const [active, setActive] = useState('all');

    const configure = (param) => {

        setActive(param);
    }

    const renderSwitch = (tag) => {
        switch (tag) {
            case 'all':
                return <Suggestions/>;
            case 'sent':
                return <SentRequests/>;
            case 'request':
                return <Invitations/>;
            default:
                return <Suggestions/>;
        }
    }

    return (
        <>
            <ul className={styles['pofile-ul']}>
                <li onClick={() => { configure('all') }} className={styles['pofile-list']}>
                    <h5 className={`${styles['pofile-tags']} ${active === 'all' ? styles['active-tag'] : null}`}>Suggestions</h5>
                </li>
                <li onClick={() => { configure('sent') }} className={styles['pofile-list']}>
                    <h5 className={`${styles['pofile-tags']} ${active === 'sent' ? styles['active-tag'] : null}`}>Sent requests</h5>
                </li>
                <li onClick={() => { configure('request') }} className={styles['pofile-list']}>
                    <h5 className={`${styles['pofile-tags']} ${active === 'request' ? styles['active-tag'] : null}`}>Friend requests</h5>
                </li>
            </ul>
            {renderSwitch(active)}
        </>
    );
}