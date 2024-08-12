import { HubConnectionBuilder } from '@microsoft/signalr';

let hubConnection;

export const getHubConnection = () => {
    if (!hubConnection) {
        hubConnection = new HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();
    }
    return hubConnection;
};