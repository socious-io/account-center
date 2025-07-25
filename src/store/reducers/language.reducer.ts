import { createSlice } from '@reduxjs/toolkit';

export interface LangState {
  language: 'en' | 'ja' | 'es' | 'ko' | 'ar' | 'fr' | 'zh-CN';
}

const initialState = {
  language:
    new URLSearchParams(window.location.search).get('lang') ||
    localStorage.getItem('i18nextLng') ||
    navigator.language ||
    'en',
} as LangState;

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
