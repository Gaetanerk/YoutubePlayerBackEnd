const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    artist: String,
    videoId: String,
    cover: String,
    link: String
});

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    videos: [videoSchema]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
