import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    songs: JSON.parse(localStorage.getItem('songs')) || [],
    currentSong: null
};

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setSongs: (state, action) => {
            state.songs = action.payload;
            localStorage.setItem('songs', JSON.stringify(state.songs));
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        deleteSong: (state, action) => {
            state.songs = state.songs.filter(song => song.id !== action.payload);
            localStorage.setItem('songs', JSON.stringify(state.songs));
        },
        createNewSong: (state, action) => {
            const newSong = {
                id: new Date().getTime(),
                title: 'Untitled',
                content: ''
            };
            state.songs = [newSong, ...state.songs];
            localStorage.setItem('songs', JSON.stringify(state.songs));
        }
    }
});

export const { setSongs, setCurrentSong, deleteSong, createNewSong } = songSlice.actions;

export default songSlice.reducer;
