import { useState } from 'react';
import styles from './GroupHeader.module.css'
import { useCurrentUser } from '../../../../hooks/useCookies';
import { request } from '../../../../services/request';
import { Modal } from '../../../Modal/Modal';
import { useNavigate } from 'react-router-dom';

export function GroupHeader({
    setTag,
    groupData,
    isMember
}) {

    const [active, setActive] = useState('post');
    const [modal, setModal] = useState(false);
    const [pending, setPending] = useState(false);
    const user = useCurrentUser();
    const navigate = useNavigate();

    const configure = (param) => {
        setTag(param);
        setActive(param);
    }

    const onGroupEvent = async (param) => {

        try {

            if (param === 'leave') {

                await request('post', `api/group/leave?groupId=${groupData.id}`);
                isMember.setIsMember(false);

            } else if (param === 'join') {

                if(groupData.access === 'Public'){

                    await request('post', `api/group/join?groupId=${groupData.id}`);
                    isMember.setIsMember(true);

                }else if(groupData.access === 'Private'){

                    await request('post', `api/group/join-private?groupId=${groupData.id}`);
                    setPending(true);
                }
            }
        } catch {

            setModal(true);
        }
    }

    const checkForPendingRequests = () => {
        
        request('get', `api/group/membership-pending?groupId=${groupData.id}`).then(x => setPending(x.data));
        
        if(pending){

            return true;
        }

        return false;
    }

    const onGroupDelete = async (groupId) => {

        let result = await request('post', `api/group/delete-group?groupId=${groupId.toLowerCase()}`);
        result.name === "AxiosError" ? setModal(true) :
            navigate('/groups');
    }

    return (
        <>
            {modal ? <Modal message='Something went wrong' setModal={setModal} /> : null}
            <div className={styles['collection-hero']}>
                <div className={styles['img-container']}>
                    <img className={styles['collection-hero-image']} src="https://www.shutterstock.com/image-illustration/social-group-friends-3d-rendered-600w-74877187.jpg" alt="" />
                    {user.userId === groupData.ownerId ? <button className={`${styles['btn-main-photo']}`}>Add photo</button> : null}
                    <h2 className={styles['pofile-username']}>{groupData.name}</h2>

                    {user.userId === groupData.ownerId ?
                        <button className="btn btn-outline-danger" onClick={() => onGroupDelete(groupData.id)}>Delete</button> :
                        <div className={styles['group-btn']}>
                            {isMember.isMember ? <button className="btn btn-outline-danger" onClick={() => onGroupEvent('leave')}>Leave group</button>
                                : 
                                checkForPendingRequests() ? <button className={`${styles['approval']} text-light`}>Waiting for approval</button> : <button className="btn btn-outline-primary" onClick={() => onGroupEvent('join')}>Join group</button>}
                        </div>}

                    <hr className={styles['pofile-hr']} />
                    <ul className={styles['pofile-ul']}>
                        <li onClick={() => { configure('post') }} className={styles['pofile-list']}>
                            <h5 className={`${styles['pofile-tags']} ${active === 'post' ? styles['active-tag'] : null}`}>Posts</h5>
                        </li>
                        <li onClick={() => { configure('photos') }} className={styles['pofile-list']}>
                            <h5 className={`${styles['pofile-tags']} ${active === 'photos' ? styles['active-tag'] : null}`}>Media</h5>
                        </li>
                        <li onClick={() => { configure('members') }} className={styles['pofile-list']}>
                            <h5 className={`${styles['pofile-tags']} ${active === 'members' ? styles['active-tag'] : null}`}>Members</h5>
                        </li>
                        {user.userId === groupData.ownerId && groupData.access === "Private"?
                            <li onClick={() => { configure('requests') }} className={styles['pofile-list']}>
                                <h5 className={`${styles['pofile-tags']} ${active === 'requests' ? styles['active-tag'] : null}`}>Membership requests</h5>
                            </li> : null}
                        <li onClick={() => { configure('info') }} className={styles['pofile-list']}>
                            <h5 className={`${styles['pofile-tags']} ${active === 'info' ? styles['active-tag'] : null}`}>Info</h5>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}