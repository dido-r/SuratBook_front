import { useRef } from 'react';
import styles from './Chat.module.css';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useCurrentUser } from '../../hooks/useCookies';

export function Chat({
    chat,
    sendMessage
}) {

    const bottom = useRef(null);
    const { values, onChangeHandler, resetValues } = useForm({

        message: ''
    });
    const user = useCurrentUser();

    useEffect(() => {
        
        bottom.current?.scrollIntoView({ behavior: 'smooth' });

    }, [chat]);

    const onMessageSend = (e) => {

        e.preventDefault();
        sendMessage(user.userId, values.message);
        resetValues(e);
    }

    return (
        <div className={styles['chat-container']}>

            <div className={styles['chat-history']}>
                <h5 className={styles['chat-history-header']}>Chat history</h5>
                <form>
                    <input className={styles['chat-filter-input']} required='required' type="text" name="message" placeholder="Search for chat..." />
                </form>
                <ul>
                    <li className='d-flex'>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <div>
                            <h5>Friend</h5>
                            <p>Resent messages</p>
                        </div>
                    </li>
                    <li className='d-flex'>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <div>
                            <h5>Friend</h5>
                            <p>Resent messages</p>
                        </div>
                    </li>
                    <li className='d-flex'>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <div>
                            <h5>Friend</h5>
                            <p>Resent messages</p>
                        </div>
                    </li>
                </ul>
            </div>
            <hr />

            <div className={styles['chat']}>
                <form className={styles['chat-form']} onSubmit={(e) => onMessageSend(e)}>
                    <input className={styles['chat-input']} required='required' type="text" name="message" placeholder="Search friend..." value={values.message} onChange={(e) => onChangeHandler(e)}/>
                </form>
                <div className={styles['chat-messages']}>
                    <div className={styles['chat-button']}>
                        <button className='btn btn-outline-light'>Show more</button>
                    </div>
                    <ul>
                        {chat.map(x => (
                            <li className={x.userId === user.userId ? styles['message-mine'] : styles['message-friend']}><span>{x.message}</span></li>
                        ))}
                    </ul>
                    <div ref={bottom} />
                </div>
            </div>
            <hr />

            <div className={styles['chat-friends']}>
                <h5>Browse friends for chat</h5>
                <form className={styles['chat-friends-form']}>
                    <input className={styles['chat-friends-input']} required='required' type="text" name="content" placeholder="Search friend..." />
                </form>
                <ul>
                    <li>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <p>Friend Friend</p>
                    </li>
                    <li>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <p>Friend Friend</p>
                    </li>
                    <li>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <p>Friend Friend</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}