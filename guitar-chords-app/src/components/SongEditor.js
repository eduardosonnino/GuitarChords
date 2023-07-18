import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSongs, setCurrentSong } from '../features/songSlice';
import { v4 as uuidv4 } from 'uuid';
import './SongEditor.css'; 

const SongEditor = () => {
  const currentSong = useSelector((state) => state.song.currentSong);
  const songs = useSelector((state) => state.song.songs);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (currentSong) {
      setTitle(currentSong.title);
      setBody(currentSong.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [currentSong]);

  const saveSong = () => {
    if (currentSong) {
      const updatedSongs = songs.map((song) =>
        song.id === currentSong.id ? { id: currentSong.id, title, body } : song
      );
      dispatch(setSongs(updatedSongs));
      dispatch(setCurrentSong({ id: currentSong.id, title, body }));
    } else {
      const newSongId = uuidv4();
      const newSong = { id: newSongId, title, body };
      dispatch(setSongs([...songs, newSong]));
      dispatch(setCurrentSong(newSong));
    }
  };

  useEffect(() => {
    saveSong();
  }, [title, body]);

  return (
    <div className="song-editor">
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="song-title"
      />
      <textarea 
        placeholder="Lyrics & chords" 
        value={body} 
        onChange={(e) => setBody(e.target.value)}
        className="song-body"
      />
    </div>
  );
};

export default SongEditor;
