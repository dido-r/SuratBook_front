import { useRef, useState } from 'react';
import styles from './Chat.module.css';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useCurrentUser } from '../../hooks/useCookies';
import { request } from '../../services/request';

export function Chat({
    chat,
    setChat,
    sendMessage,
    chatRooms,
    setChatRooms,
    notification
}) {
    
    const bottom = useRef(null);
    const { values, onChangeHandler, resetValues } = useForm({
        
        message: ''
    });
    const [currentChatId, setCurrentChatId] = useState(null);
    const [connections, setConnections] = useState([]);
    const [offset, setOffset] = useState(0);
    const messageLimit = 50;
    const [end, setEnd] = useState(false);
    const user = useCurrentUser();
    
    useEffect(() => {
        
        if(offset === 0){
            
            bottom.current?.scrollIntoView();
        }
        
    }, [chat, offset]);
    
    useEffect(() => {
        
        const newList = chatRooms.map((x) => {
            
            if (x.id === notification && currentChatId !== x.id) {
                
                request('post', `api/chatRoom/set-notification?chatId=${x.id}&param=on`);

                const updatedItem = {
                    ...x,
                    notification: true,
                };
                
                return updatedItem;
            }
            
            return x;
        });
        
        setChatRooms(newList);
        
    }, [notification]);
    
    useEffect(() => {

        if (offset !== 0) {

            request('get', `api/chatRoom/get-messages?chatId=${currentChatId}&offset=${offset}&messageLimit=${messageLimit}`)
                .then(x => {

                    if (x.data.length < messageLimit) {

                        setEnd(true)
                    }

                    setChat(current => [...x.data, ...current]);
                });
        }

    }, [offset]);

    const onMessageSend = (e) => {

        e.preventDefault();
        sendMessage(user.userId, values.message, currentChatId, connections);
        resetValues(e);
    }

    // const startChat = async (receiverId) => {

    //     await request('post', `api/chatRoom/create?receiverId=${receiverId}`)
    // }

    const notificationClear = (id) => {

        const newList = chatRooms.map((x) => {

            if (x.id === id) {

                request('post', `api/chatRoom/set-notification?chatId=${id}&param=off`);

                const updatedItem = {
                    ...x,
                    notification: false,
                };

                return updatedItem;
            }

            return x;
        });

        setChatRooms(newList);
    }

    const onChatSelect = async (chatId) => {

        setOffset(0);
        notificationClear(chatId);
        setCurrentChatId(chatId);
        let result = await request('get', `api/chatRoom/get-connection?chatId=${chatId}`);
        setConnections(result.data);
        let messages = await request('get', `api/chatRoom/get-messages?chatId=${chatId}&offset=${offset}&messageLimit=${messageLimit}`);
        setChat(messages.data);
    }

    return (
        <div className={styles['chat-container']}>

            <div className={styles['chat-history']}>
                <h5 className={styles['chat-history-header']}>Chat history</h5>
                <form>
                    <input className={styles['chat-filter-input']} required='required' type="text" name="message" placeholder="Search for chat..." />
                </form>
                <ul>
                    {chatRooms.map(x => (
                        <li key={x.id} className={`${currentChatId === x.id ? styles['chat-selected'] : null} d-flex`} onClick={() => onChatSelect(x.id)}>
                            <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                            <div>
                                <h5>{x.chatFriendName}</h5>
                                {x.notification ? <p className={styles['last-message']}>New messages</p> : <p className={styles['last-message']}>No new messages</p>}
                            </div>
                            {x.notification ? <p className={styles['notification']}></p> : null}
                        </li>
                    ))}
                </ul>
            </div>
            <hr />

            <div className={styles['chat']}>
                {currentChatId === null ?
                    <div className='text-center'>
                        <img src='/chat-img.png' alt='chat-img' />
                        <h4>Welcome to SuratChat!</h4>
                    </div>
                    :
                    <>
                        <form className={styles['chat-form']} onSubmit={(e) => onMessageSend(e)}>
                            <input className={styles['chat-input']} required='required' type="text" name="message" placeholder="Search friend..." value={values.message} onChange={(e) => onChangeHandler(e)} />
                        </form>
                        <div className={styles['chat-messages']}>
                            <div className={styles['chat-button']}>
                                {!end ? <button className='btn btn-outline-light' onClick={() => setOffset(x => x + messageLimit)}>Show more</button> : null}
                            </div>
                            <ul>
                                {chat.map(x => (
                                    <li className={x.userId === user.userId ? styles['message-mine'] : styles['message-friend']}><span>{x.message}</span></li>
                                ))}
                            </ul>
                            <div ref={bottom} />
                        </div>
                    </>}
            </div>
        </div>
    );
}