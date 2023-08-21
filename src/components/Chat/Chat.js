import { useRef } from 'react';
import styles from './Chat.module.css';
import { useEffect } from 'react';

export function Chat() {

    const bottom = useRef(null);

    useEffect(() => {

        bottom.current?.scrollIntoView({ behavior: 'smooth' });

    }, []);

    return (
        <div className={styles['chat-container']}>

            <div className={styles['chat-history']}>
                <h5 className={styles['chat-history-header']}>Chat history</h5>
                <form>
                    <input className={styles['chat-filter-input']} required='required' type="text" name="content" placeholder="Search for chat..." />
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
                <form className={styles['chat-form']}>
                    <input className={styles['chat-input']} required='required' type="text" name="content" placeholder="Search friend..." />
                </form>
                <div className={styles['chat-messages']}>
                    <div className={styles['chat-button']}>
                        <button className='btn btn-outline-light'>Show more</button>
                    </div>
                    <ul>
                        <li className={styles['message-mine']}><span>test test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test test</span></li>
                        <li className={styles['message-friend']}><span>test test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test testtest test test test test test test test test test</span></li>
                        <li className={styles['message-mine']}><span>test</span></li>
                        <li className={styles['message-mine']}><span>test</span></li>
                        <li className={styles['message-friend']}><span>test</span></li>
                        <li className={styles['message-mine']}><span>test</span></li>
                        <li className={styles['message-mine']}><span>test</span></li>
                        <li className={styles['message-mine']}><span>test</span></li>
                        <li className={styles['message-friend']}><span>test</span></li>
                        <li className={styles['message-friend']}><span>test</span></li>
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