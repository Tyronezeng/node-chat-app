const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const socketController = require('../controllers/socketController');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
socketController(io);

app.use(express.static(publicPath));

server.listen(PORT);
module.exports = io;
