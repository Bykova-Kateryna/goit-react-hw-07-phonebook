import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const statusPending = (state, action) => {
  state.isLoading = true;
  state.actionTypeStatus = action.type;
};

const statusRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.actionTypeStatus = false;
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    actionTypeStatus: null,
  },
  extraReducers: {
    [fetchContacts.pending]: statusPending,
    [fetchContacts.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.error = null;
      store.items = action.payload;
      store.actionTypeStatus = false;
    },
    [fetchContacts.rejected]: statusRejected,
    [addContact.pending]: statusPending,
    [addContact.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.error = null;
      store.items.push(action.payload);
      store.actionTypeStatus = false;
      Notify.success('Contact successfully added!');
    },
    [addContact.rejected]: statusRejected,
    [deleteContact.pending]: statusPending,
    [deleteContact.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.error = null;
      store.items = store.items.filter(item => item.id !== action.payload.id);
      store.actionTypeStatus = false;
      Notify.failure('Contact successfully deleted!');
    },
    [deleteContact.rejected]: statusRejected,
  },
});

const filtersSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContact: {
      reducer(state, action) {
        return (state = action.payload);
      },
    },
  },
});

export const phoneBookReducer = phonebookSlice.reducer;
export const { filterContact } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const actions = phonebookSlice.actions;
