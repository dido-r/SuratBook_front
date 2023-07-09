import { useState } from 'react';
import styles from './GroupHeader.module.css'

export function GroupHeader({setTag}) {

    const [active, setActive] = useState('post');

    const configure = (param) => {
        setTag(param);
        setActive(param);
    }

    return (
        <div className={styles['collection-hero']}>
            <div className={styles['img-container']}>
                <img className={styles['collection-hero-image']} src="" alt="" />
                <h2 className={styles['pofile-username']}>Group Name</h2>

                <div className={styles['group-btn']}>
                    <button className="btn btn-outline-primary">Join group</button>
                    <button className="btn btn-outline-danger">Leave group</button>
                </div>  

                <hr className={styles['pofile-hr']} />
                <ul className={styles['pofile-ul']}>
                    <li onClick={() => { configure('post') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'post' ? styles['active-tag'] : null}`}>Posts</h5>
                    </li>
                    <li onClick={() => { configure('photos') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'photos' ? styles['active-tag'] : null}`}>Photos</h5>
                    </li>
                    <li onClick={() => { configure('members') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'members' ? styles['active-tag'] : null}`}>Members</h5>
                    </li>
                    <li onClick={() => { configure('info') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'info' ? styles['active-tag'] : null}`}>Info</h5>
                    </li>
                </ul>
            </div>
        </div>
    );
}