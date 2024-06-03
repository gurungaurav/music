import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from "@/utils/localStorage-handler";
import { UserStateTypes } from "@/interfaces/types/index.interfaces";

const localStorageData = getLocalStorage();

const initialState: UserStateTypes = {
  picture: localStorageData?.picture ?? "",
  name: localStorageData?.name ?? "",
  email: localStorageData?.email ?? "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<UserStateTypes>) => {
      const { picture, name, email } = action.payload;
      setLocalStorage({ picture, name, email });
      state.picture = picture;
      state.name = name;
      state.email = email;
    },
    updateData: (state, action: PayloadAction<Partial<UserStateTypes>>) => {
      const { picture, name, email } = action.payload;
      if (picture !== undefined) state.picture = picture;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;

      setLocalStorage({
        picture: state.picture,
        name: state.name,
        email: state.email,
      });
    },
    clearData: (state) => {
      clearLocalStorage();
      state.picture = "";
      state.name = "";
      state.email = "";
    },
  },
});

export const { setData, clearData, updateData } = userSlice.actions;

export default userSlice.reducer;
