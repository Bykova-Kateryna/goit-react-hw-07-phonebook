import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const statusPending = state => {
  state.isLoading = true;
};

const statusRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: statusPending,
    [fetchContacts.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.error = null;
      store.items = action.payload;
    },
    [fetchContacts.rejected]: statusRejected,
    [addContact.pending]: statusPending,
    [addContact.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.error = null;
      store.items.push(action.payload);
    },
    [addContact.rejected]: statusRejected,
    [deleteContact.pending]: statusPending,
    [deleteContact.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.error = null;
      store.items = store.items.filter(item => item.id !== action.payload.id);
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
