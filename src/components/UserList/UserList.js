import { useState } from 'react';
import styles from './UserList.module.css';
import { Suggestions } from './Suggestions/Suggestions';
import { SentRequests } from './SentRequests/SentRequests';
import { Invitations } from './Invitations/Invitations';
import { Spinner } from '../Spinner/Spinner';

export function UserList() {

    const [active, setActive] = useState('all');
    const [loading, setLoading] = useState(true);

    const configure = (param) => {

        setActive(param);
    }

    const renderSwitch = (tag) => {
        switch (tag) {
            case 'all':
                return <Suggestions setLoading={setLoading}/>;
            case 'sent':
                return <SentRequests setLoading={setLoading}/>;
            case 'request':
                return <Invitations setLoading={setLoading}/>;
            default:
                return <Suggestions setLoading={setLoading}/>;
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
            {loading ? <Spinner /> : null}
            {renderSwitch(active)}
        </>
    );
}