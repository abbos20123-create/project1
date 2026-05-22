import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './Slice'
import testDriveReducer from './testDriveSlice'
import contactReducer from './contactSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    testdrive: testDriveReducer,
    contact: contactReducer

  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch