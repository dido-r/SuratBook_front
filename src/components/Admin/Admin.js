import { useState } from 'react';
import { AllUsers } from './AllUsers/AllUsers';
import { AllPosts } from './AllPosts/AllPosts';
import styles from './Admin.module.css';
import { AllGroups } from './AllGroups/AllGroups';

export function Admin() {

    const [menu, setMenu] = useState('')

    const renderSwitch = (menu) => {
        switch (menu) {
            case 'users':
                return <AllUsers />;
            case 'posts':
                return <AllPosts />;
            case 'groups':
                return <AllGroups />;
            default:
                return <></>;
        }
    }

    return (
        <>
            <div className={styles['button-container']}>
                <button className="btn btn-outline-light" onClick={() => setMenu('users')}>All users</button>
                <button className="btn btn-outline-light" onClick={() => setMenu('posts')}>All posts</button>
                <button className="btn btn-outline-light" onClick={() => setMenu('groups')}>All groups</button>
            </div>
            <div className={styles['admin-container']}>
            {renderSwitch(menu)}
            </div>
            
        </>
    )
}