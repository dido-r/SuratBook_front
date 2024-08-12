import { createSlice } from '@reduxjs/toolkit';
import { HubConnectionBuilder } from '@microsoft/signalr';

const connectionHub = createSlice({
  name: 'connection',
  initialState: {
    connection: new HubConnectionBuilder()
            .withUrl('http://localhost:5000/online-users')
            .withAutomaticReconnect()
            .build()
  },
  reducers: {}
})

export const { } = connectionHub.actions

export default connectionHub.reducer