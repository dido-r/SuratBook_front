import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Chat } from './Chat';

export function ChatHub() {

    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7062/chat')
            .withAutomaticReconnect()
            .build();
            
        setConnection(newConnection);
    }, []);

    useEffect(() => {

        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', message => {
                        setChat(current => [...current, message]);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message, connections) => {

        const chatMessage = {
            userId: user,
            message: message
        };

        if (connection._connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage, connections);
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

        <Chat chat={chat} sendMessage={sendMessage} connection={connection}/>
    );
};
