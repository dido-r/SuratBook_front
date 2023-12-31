import { useState, useEffect } from 'react';
import styles from './Banner.module.css';
import { useCurrentUser } from '../../../hooks/useCookies';
import { request } from '../../../services/request';
import { useDropBox } from '../../../hooks/useDropbox';
import { useParams } from 'react-router-dom';

export function Banner({
    setTag,
    setGroupTag,
    user
}) {

    const [active, setActive] = useState('post');
    const [areFriends, setAreFriends] = useState('');
    const [src, setSrc] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const currentUser = useCurrentUser();
    const param = useParams();
    const { getFile } = useDropBox();

    useEffect(() => {

        const fetchData = async () => {

            let path = await request('get', `api/photo/get-a-profile?userId=${param.id}`);

            if (path.data !== null && path.data !== '' && path.data !== undefined) {

                let res = await getFile(path.data);
                setSrc(URL.createObjectURL(res));
            }else{
                setSrc('https://cdn-icons-png.flaticon.com/512/149/149071.png');
            }
        }
        setActive('post');
        fetchData();
    }, [param.id]);

    const checkFriendship = () => {

        request('get', `api/friend/check-friendship?friendId=${user.id}`).then(x => setAreFriends(x.data));
    }

    const addAsFriend = async (id) => {

        await request('post', `api/friend/add?friendId=${id}`);
        setAreFriends('Friends');
    }

    const removeFriend = async (userId) => {

        await request('post', `api/friend/remove?friendId=${userId}`);
        setAreFriends('No friends');
    }

    const renderSwitch = (areFriends, userId) => {

        checkFriendship();

        switch (areFriends) {
            case 'No friends':
                return <button className="btn btn-outline-primary" onClick={() => addAsFriend(userId)}>Add as friend</button>;
            case 'Pending request':
                return <button className="btn btn-outline-light">Waiting for approval</button>;
            case 'Friends':
                return <button className="btn btn-outline-danger" onClick={() => removeFriend(userId)}>Remove from friends</button>;
            default:
                return <></>;
        }
    }

    const configure = (param) => {

        if (param === 'groups' || param === 'joined' || param === 'owner') {

            setTag('groups');
            setActive(param);
            setGroupTag(param);

        } else {

            setTag(param);
            setActive(param);
        }
    }

    const isGroupSection = () => {

        return active === 'groups' || active === 'joined' || active === 'owner';
    }


    return (
        <div className={styles['collection-hero']}>
            <div className={styles['collection-container']}>
                <img className={styles['profile-img']} src={src} alt="img" />
                <h2 className={styles['pofile-username']}>{user.name}</h2>

                {currentUser.userId !== user.id ?
                    <div className={styles['friend-btn']}>
                        {renderSwitch(areFriends , user.id)}
                    </div> : null}


                <hr className={styles['pofile-hr']} />
                <ul className={styles['pofile-ul']}>
                    <li onClick={() => { configure('post') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'post' ? styles['active-tag'] : null}`}>Posts</h5>
                    </li>
                    <li onClick={() => { configure('photos') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'photos' ? styles['active-tag'] : null}`}>Photos</h5>
                    </li>
                    <li onClick={() => { configure('friends') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'friends' ? styles['active-tag'] : null}`}>Friends</h5>
                    </li>
                    <li onClick={() => { configure('groups') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${isGroupSection() ? styles['active-tag'] : null}`}>Groups</h5>
                    </li>
                    <li onClick={() => { configure('info') }} className={styles['pofile-list']}>
                        <h5 className={`${styles['pofile-tags']} ${active === 'info' ? styles['active-tag'] : null}`}>Info</h5>
                    </li>
                </ul>
                {isGroupSection() ?
                    <>
                        <hr className={styles['pofile-hr-add']} />
                        <ul className={styles['pofile-ul']}>
                            <li onClick={() => configure('joined')} className={styles['pofile-list']}>
                                <h5 className={`${styles['pofile-tags']} ${active === 'joined' || active === 'groups' ? styles['active-tag'] : null}`}>Joined groups</h5>
                            </li>
                            <li onClick={() => configure('owner')} className={styles['pofile-list']}>
                                <h5 className={`${styles['pofile-tags']} ${active === 'owner' ? styles['active-tag'] : null}`}>Created groups</h5>
                            </li>
                        </ul>
                    </> : null}
            </div>
        </div>
    );
}