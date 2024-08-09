import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Chat } from './Chat';
import { request } from '../../services/request';

export function ChatHub() {

    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [notification, setNotification] = useState(null);
    const [currentChatId, setCurrentChatId] = useState(null);


    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
        request('get', 'api/chatRoom/get').then(x => setChatRooms(x.data));
    }, []);

    useEffect(() => {

        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    request('post', 'api/chatRoom/create-connection',
                        {
                            connectionId: connection.connection.connectionId
                        });

                    connection.on('ReceiveMessage', message => {

                        if (localStorage.getItem("chatRoomId") === message.chatRoomId) {

                            setChat(current => [...current, message]);
                        }
                    });

                    connection.on('ReceiveNotification', currentChatId => {

                        setNotification(currentChatId);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message, currentChatId, connections) => {

        const chatMessage = {
            userId: user,
            message: message,
            chatRoomId: currentChatId
        };

        if (connection._connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage, connections);
                await connection.send('SendNotification', currentChatId, connections.find(x => x !== connection.connection.connectionId));

                await request('post', 'api/chatRoom/create-message', {
                    message: chatMessage.message,
                    ownerId: user,
                    chatRoomId: currentChatId
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (

        <Chat
            chat={chat}
            sendMessage={sendMessage}
            connection={connection}
            setChat={setChat}
            chatRooms={chatRooms}
            setChatRooms={setChatRooms}
            notification={notification}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            setNotification={setNotification}
        />
    );
};
