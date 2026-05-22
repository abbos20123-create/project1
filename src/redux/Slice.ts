import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HomeState = {
  name: string;
  video: string;
};

const initialState: HomeState = {
  name: "KIA K3",
  video: "/bNSHqnzwOsctDG0AaqcC+qp_K3snRZgQ.mp4",
};

const homeSlice = createSlice({
  name: "home",
  initialState,

  reducers: {
    updateHomepage: (
      state,
      action: PayloadAction<HomeState>
    ) => {
      state.name = action.payload.name;
      state.video = action.payload.video;
    },

    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    updateVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
  },
});

export const {
  updateHomepage,
  updateName,
  updateVideo,
} = homeSlice.actions;

export default homeSlice.reducer;