const express = require('express');
const mongoose = require('mongoose');
const Playlist = require('./models/Playlist');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://gaetanturben:R%40lphcaya301183erK@turbenbdd.a06sqsn.mongodb.net/PlayerYoutubeAudio')
    .then(() => {
        console.log('Connected to MongoDB');
        return Playlist.find({});
    })
    .then(playlists => {
        console.log('Playlists:', playlists);
    })
    .catch(err => console.error(err));

app.use(express.json());

app.post('/playlists', async (req, res) => {
    const playlist = new Playlist({
        name: req.body.name,
        videos: req.body.videos
    });
    await playlist.save();
    res.send(playlist);
});

app.get('/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/playlist/:name', async (req, res) => {
    try {
        const playlists = await Playlist.find({ name: req.params.name });
        if (playlists.length === 0) {
            return res.status(404).json({ message: 'No playlists found' });
        }
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
