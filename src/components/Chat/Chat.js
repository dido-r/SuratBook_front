import { useRef, useState } from 'react';
import styles from './Chat.module.css';
import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useCurrentUser } from '../../hooks/useCookies';
import { request } from '../../services/request';

export function Chat({
    chat,
    sendMessage,
    connection
}) {

    const bottom = useRef(null);
    const { values, onChangeHandler, resetValues } = useForm({

        message: ''
    });
    const [chatRooms, setChatRooms] = useState([]);
    const [connections, setConnections] = useState([]);
    const user = useCurrentUser();

    useEffect(() => {
        
        request('get', 'api/chatRoom/get').then(x => setChatRooms(x.data))
        bottom.current?.scrollIntoView({ behavior: 'smooth' });

    }, [chat]);

    const onMessageSend = (e) => {

        e.preventDefault();
        console.log(connections)
        sendMessage(user.userId, values.message, connections);
        resetValues(e);
    }

    // const startChat = async (receiverId) => {

    //     await request('post', `api/chatRoom/create?receiverId=${receiverId}`)
    // }

    const onChatSelect = async (chatId) => {

        await request('post', 'api/chatRoom/create-connection', 
        {
            connectionId: connection.connection.connectionId, 
            chatRoomId: chatId
        });

        let result = await request('get', `api/chatRoom/get-connection?chatId=${chatId}`);
        setConnections(result.data);
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
                        <li key={x.id} className='d-flex' onClick={() => onChatSelect(x.id)}>
                        <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                        <div>
                            <h5>{x.chatFriendName}</h5>
                            <p>{x.lastMessage}</p>
                        </div>
                    </li>
                    ))}
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
        </div>
    );
}