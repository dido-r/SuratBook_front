import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../services/request';

export const fetchOnlineUsers = createAsyncThunk(
    'onlineUsers/fetchOnlineUsers',
    async () => {
        const response = await request('get', 'api/user/get-online-users');
        return response.data;
    }
);

const onlineUsers = createSlice({
    name: 'onlineUsers',
    initialState: {
        list: []
    },
    reducers: {
        add: (state, action) => {

            if(!state.list.includes(action.payload)){
                
                state.list.push(action.payload);
            }
        },
        remove: (state, action) => {
            state.list = state.list.filter(user => user.id.toLowerCase() !== action.payload.toLowerCase());
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOnlineUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOnlineUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchOnlineUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export const { add, remove, getOnlineUsers } = onlineUsers.actions

export default onlineUsers.reducer