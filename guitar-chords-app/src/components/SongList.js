import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong, setSongs, deleteSong } from '../features/songSlice';
import { ResizableBox } from 'react-resizable';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid'; // Add this import
import './SongList.css';

const SongList = () => {
  const songs = useSelector((state) => state.song.songs);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  useEffect(() => {
    fetch('songs.json')
      .then((response) => response.json())
      .then((songsData) => dispatch(setSongs(songsData)));
  }, [dispatch]);

  const handleDelete = (song) => {
    setSongToDelete(song);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteSong(songToDelete.id));
    setModalOpen(false);
  };

  const createNewSong = () => {
    const newSong = {
      id: uuidv4(),
      title: 'New Song',
      chords: '',
      lyrics: '',
    };
    dispatch(setSongs([...songs, newSong]));
    dispatch(setCurrentSong(newSong));
  };

  return (
    <div className="app">
      <ResizableBox width={200} height={Infinity} minConstraints={[100, Infinity]} maxConstraints={[300, Infinity]} className="resizable-box">
        <button className="new-song-button" onClick={createNewSong}>New Song</button>
        <ul className="list-group">
          {songs.map((song) => (
            <li key={song.id} className="list-group-item">
              <div onClick={() => dispatch(setCurrentSong(song))}>{song.title}</div>
              <button onClick={() => handleDelete(song)}>Delete</button>
            </li>
          ))}
        </ul>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this song?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmDelete} color="primary">
              Yes
            </Button>
            <Button onClick={() => setModalOpen(false)} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </ResizableBox>
    </div>
  );
};

export default SongList;
