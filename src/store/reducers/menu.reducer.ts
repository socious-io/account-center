import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: true,
  reducers: {
    showMenu: () => {
      return true;
    },
    hideMenu: () => {
      return false;
    },
  },
});

export const { showMenu, hideMenu } = menuSlice.actions;
