import { useRef, useState, useEffect } from 'react';
import styles from './Chat.module.css';
import { useForm } from '../../hooks/useForm';
import { useCurrentUser } from '../../hooks/useCookies';
import { request } from '../../services/request';

export function Chat({
    chat,
    setChat,
    sendMessage,
    chatRooms,
    setChatRooms,
    notification,
    currentChatId,
    setCurrentChatId,
    setNotification
}) {

    const bottom = useRef(null);
    const { values, onChangeHandler, resetValues } = useForm({

        message: ''
    });
    const [connections, setConnections] = useState([]);
    const [offset, setOffset] = useState(0);
    const messageLimit = 50;
    const [end, setEnd] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const user = useCurrentUser();

    useEffect(() => {

        if (offset === 0) {

            bottom.current?.scrollIntoView();
        }

    }, [chat, offset]);

    useEffect(() => {

        if (notification !== null) {

            let exist = chatRooms.some(x => {

                if (x.id.toLowerCase() === notification.toLowerCase()) {

                    return true;
                }

                return false;
            });

            if (!exist) {

                request('post', `api/chatRoom/add?chatId=${notification}`).then(x =>

                    setChatRooms(current => [...current, x.data]));

            } else {

                const newList = chatRooms.map((x) => {
                    
                    if (x.id.toLowerCase() === notification.toLowerCase() && currentChatId !== x.id) {

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
            }
        }

        setNotification(null)

    }, [notification]);

    useEffect(() => {

        if (offset !== 0) {

            request('get', `api/chatRoom/get-messages?chatId=${currentChatId}&offset=${offset}&messageLimit=${messageLimit}`)
                .then(x => {

                    if (x.data.length < messageLimit) {

                        setEnd(true)
                    }

                    setChat(current => [ ...x.data, ...current]);
                });
        }

    }, [offset]);

    useEffect(() => {

        request('get', 'api/user/all-users').then(x => setUsers(x.data));

    }, []);

    const onMessageSend = async (e) => {

        e.preventDefault();
        let result = await request('get', `api/chatRoom/get-connection?chatId=${currentChatId}`);
        sendMessage(user.userId, values.message, currentChatId, result.data);
        resetValues(e);
    }

    const startChat = async (receiverId) => {

        let isExist = await request('get', `api/chatRoom/exist?receiverId=${receiverId}`);

        if (isExist.data === "do not exist") {

            let result = await request('post', `api/chatRoom/create?receiverId=${receiverId}`);
            setChatRooms(chatRooms.push(result.data));
            onChatSelect(result.data.id);
        } else {

            onChatSelect(isExist.data.toUpperCase());
        }

        setSearch(false);
    }

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
        localStorage.setItem("chatRoomId", chatId)
        let result = await request('get', `api/chatRoom/get-connection?chatId=${chatId}`);
        setConnections(result.data);
        let messages = await request('get', `api/chatRoom/get-messages?chatId=${chatId}&offset=${offset}&messageLimit=${messageLimit}`);
        setChat(messages.data);
    }

    const showSuggestions = async (e) => {

        setSearchResults(users.filter(z => z.name.toLowerCase().includes(e.target.value.toLowerCase())));
        setSearch(true);
    }

    return (
        <div className={styles['chat-container']}>

            <div className={styles['chat-history']}>
                <h5 className={styles['chat-history-header']}>Chat history</h5>
                <input className={styles['chat-filter-input']} required='required' type="text" name="search" value={values.search} placeholder="Search for chat..." onChange={(e) => showSuggestions(e)} />
                <ul>
                    {!search ? chatRooms.map(x => (
                        <li key={x.id} className={`${currentChatId === x.id ? styles['chat-selected'] : null} d-flex`} onClick={() => onChatSelect(x.id)}>
                            <img className={styles['online-fr-img']} src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" />
                            <div>
                                <h5>{x.chatFriendName}</h5>
                                {x.notification ? <p className={styles['last-message']}>New messages</p> : <p className={styles['last-message']}>No new messages</p>}
                            </div>
                            {x.notification ? <p className={styles['notification']}></p> : null}
                        </li>
                    ))
                        :
                        searchResults.map(x => (
                            <li key={x.id} onClick={() => startChat(x.id)}>
                                <p>{x.name}</p>
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
                    <div className={styles['chatter']}>
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
                       <form className={styles['chat-form']} onSubmit={(e) => onMessageSend(e)}>
                            <input className={styles['chat-input']} required='required' type="text" name="message" placeholder="Type a message..." value={values.message} onChange={(e) => onChangeHandler(e)} />
                        </form>
                    </div>}
            </div>
        </div>
    );
}