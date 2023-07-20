import { useState } from 'react';
import { useCurrentUser } from '../../../hooks/useCookies';
import styles from './Banner.module.css';

export function Banner({
    setTag,
    setGroupTag
}) {

    const [active, setActive] = useState('post');
    const [dropdown, setDropdown] = useState(false);
    const user = useCurrentUser();

    const configure = (param) => {
        setTag(param);
        setActive(param);
    }

    const GroupConfigure = (param) => {

        configure('groups'); 
        setGroupTag(param); 
        setDropdown(false);
    }


    return (
        <div className={styles['collection-hero']}>
            <div className={styles['collection-container']}>
                <img className={styles['profile-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                <h2 className={styles['pofile-username']}>{user.userName}</h2>

                <div className={styles['friend-btn']}>
                    <button className="btn btn-outline-primary">Add as friend</button>
                    <button className="btn btn-outline-danger">Remove from friends</button>
                </div>

                <hr className={styles['pofile-hr']} />
                <ul className={styles['pofile-ul']}>
                    <li onClick={() => { configure('post') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'post' ? styles['active-tag'] : null}`}>Posts</h5>
                    </li>
                    <li onClick={() => { configure('photos') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'photos' ? styles['active-tag'] : null}`}>Photos</h5>
                    </li>
                    <li onClick={() => { configure('friends') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'friends' ? styles['active-tag'] : null}`}>Friend</h5>
                    </li>
                    <li onClick={() => { setDropdown(!dropdown) }} className={`${styles['pofile-list']} nav-item dropdown`}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'groups' ? styles['active-tag'] : null}`}>Groups</h5>
                        {dropdown ?

                            <ul className={`${styles['dropdown-menu']} dropmenu dark`}>
                                <span className="dropdown-item" onClick={() => GroupConfigure('joined')}>Joined groups</span>
                                <hr />
                                <span className="dropdown-item" onClick={() => GroupConfigure('owner')}>Created by me</span>
                            </ul>
                            :
                            null
                        }
                    </li>
                    <li onClick={() => { configure('info') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'info' ? styles['active-tag'] : null}`}>Info</h5>
                    </li>
                </ul>
            </div>
        </div>
    );
}