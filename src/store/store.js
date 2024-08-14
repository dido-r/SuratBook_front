import { configureStore } from '@reduxjs/toolkit';
import connectionHub from './connection';
import onlineUsers from './onlineUsers';

export default configureStore({
  reducer: {
    connection: connectionHub,
    onlineUsers: onlineUsers
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})