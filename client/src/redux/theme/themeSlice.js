import { createSlice } from '@reduxjs/toolkit';
import { THEMES } from '../../AppStrings';

const initialState = {
    theme: THEMES.Light,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === THEMES.Light ? THEMES.Dark: THEMES.Light;
        }
    }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;