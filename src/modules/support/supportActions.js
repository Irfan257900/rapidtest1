import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTickets = createAsyncThunk('support/fetchTickets', async () => {
  const response = await axios.get('/api/support/tickets');
  return response.data;
});

export const fetchTicketDetails = createAsyncThunk('support/fetchTicketDetails', async (id) => {
  const response = await axios.get(`/api/support/tickets/${id}`);
  return response.data;
});

export const addComment = createAsyncThunk('support/addComment', async (id, comment) => {
  const response = await axios.post(`/api/support/tickets/${id}/comments`, { comment });
  return response.data;
});

const supportSlice = createSlice({
  name: 'support',
  initialState: { tickets: [], currentTicket: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => { state.loading = true; })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTicketDetails.fulfilled, (state, action) => {
        state.currentTicket = action.payload;
      });
  }
});

export default supportSlice.reducer;
content_addCase: fetchTicketDetails.fulfilled, (state, action
content_createAsyncThunk: 'support/addComment', async (id, comment
content_createSlice: {
  name: 'support',
  initialState: { tickets: [], currentTicket: {}, loading: false },
  reducers: {},
  extraReducers: (builder
content_get: `/api/support/tickets/${id}`
content_post: `/api/support/tickets/${id}/comments`, { comment }