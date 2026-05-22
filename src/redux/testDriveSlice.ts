import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TestDriveType = {
  id: number;
  name: string;
  phone: string;
  model: string;
  comment: string;
};

type TestDriveState = {
  data: TestDriveType[];
};

const initialState: TestDriveState = {
  data: [],
};

const testDriveSlice = createSlice({
  name: "testdrive",
  initialState,

  reducers: {
    setTestDrives: (
      state,
      action: PayloadAction<TestDriveType[]>
    ) => {
      state.data = action.payload;
    },

    addTestDrive: (state,action: PayloadAction<TestDriveType>
    ) => {
      state.data.push(action.payload);
    },
    deleteTestDrive: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setTestDrives, addTestDrive, deleteTestDrive } =
  testDriveSlice.actions;

export default testDriveSlice.reducer;