// 1. Constants and Requires
const express = require('express');
const socketClient = require('socket.io-client');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const { SERVER_B } = require('./config/config'); 
const app = express();
const socket = socketClient(SERVER_B); // Address of Server B

console.log(SERVER_B);
socket.on('connect', () => {
    console.log('Connected to Server B');

    socket.emit('message_from_a', 'Hello Server B!');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Server B');
});

app.listen(3000, () => {
    console.log('Server A listening on *:3000');
});
