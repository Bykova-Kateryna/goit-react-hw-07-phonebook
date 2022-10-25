import { createSlice } from '@reduxjs/toolkit';

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addContact: {
      reducer({ contacts }, action) {
        contacts.push(action.payload);
      },
    },
    deleteContact: {
      reducer(state, action) {
        return {
          ...state,
          contacts: state.contacts.filter(
            contact => contact.id !== action.payload
          ),
        };
      },
    },
    filterContact: {
      reducer(state, action) {
        state.filter = action.payload;
      },
    },
  },
});

export const { addContact, deleteContact, filterContact } =
  phonebookSlice.actions;
export const phoneBookReducer = phonebookSlice.reducer;
