// theme global state
import { createSlice } from '@reduxjs/toolkit'


export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'light',
    },
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setTheme } = themeSlice.actions

export const selectTheme = (state: {
    theme: { value: 'light' | 'dark' }
}) => state.theme.value

export default themeSlice.reducer