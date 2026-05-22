import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ContactType = {
  id: number;
  name: string;
  phone: string;
  model: string;
};

type ContactState = {
  contacts: ContactType[];
};

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,

  reducers: {
    setContacts: (
      state,
      action: PayloadAction<ContactType[]>
    ) => {
      state.contacts = action.payload;
    },

    addContact: (
      state,
      action: PayloadAction<ContactType>
    ) => {
      state.contacts.push(action.payload);
    },

    deleteContact: (
      state,
      action: PayloadAction<number>
    ) => {
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setContacts,
  addContact,
  deleteContact,
} = contactSlice.actions;

export default contactSlice.reducer;