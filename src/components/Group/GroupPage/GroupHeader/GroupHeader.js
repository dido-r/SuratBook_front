import { useState } from 'react';
import styles from './GroupHeader.module.css'
import { useCurrentUser } from '../../../../hooks/useCookies';
import { request } from '../../../../services/request';
import { Modal } from '../../../Modal/Modal';

export function GroupHeader({
    setTag,
    groupData,
    isMember
}) {

    const [active, setActive] = useState('post');
    const [modal, setModal] = useState(false);
    const user = useCurrentUser();

    const configure = (param) => {
        setTag(param);
        setActive(param);
    }

    const onGroupEvent = async (param) => {

        try {

            param === 'leave' ? await request('post', `api/group/leave?groupId=${groupData.id}`) : await request('post', `api/group/join?groupId=${groupData.id}`);
            isMember.setIsMember(!isMember.isMember);

        } catch {

            setModal(true);
        }
    }

    return (
        <>
            {modal ? <Modal message='Something went wrong' setModal={setModal} /> : null}
            <div className={styles['collection-hero']}>
                <div className={styles['img-container']}>
                    <img className={styles['collection-hero-image']} src="" alt="" />
                    <h2 className={styles['pofile-username']}>{groupData.name}</h2>

                    {user.userId.toUpperCase() === groupData.ownerId ?
                        <button className="btn btn-outline-danger">Delete</button> :
                        <div className={styles['group-btn']}>
                            {isMember.isMember ? <button className="btn btn-outline-danger" onClick={() => onGroupEvent('leave')}>Leave group</button>
                                : <button className="btn btn-outline-primary" onClick={() => onGroupEvent('join')}>Join group</button>}
                        </div>}

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
        </>
    );
}