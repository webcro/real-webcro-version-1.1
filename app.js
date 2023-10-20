/**
 * SERVER A
 */
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
const server = http.createServer(app);
const io = socketIo(server);
const socketToB = socketClient(SERVER_B); // Address of Server B

// TEST : SEE IF THE IP IS GOOD FOR SERVER_B CONSTANT
//console.log(SERVER_B);

// Server capabilities
io.on('connection', (socket) => {
    console.log('A client connected to Server A');
    
    socket.on('message_from_client', (data) => {
        console.log('Received:', data);
    });
    
    socket.on('disconnect', () => {
        console.log('A client disconnected from Server A');
    });
});



// Client capabilities
socketToB.on('connect', () => {
    console.log('Server A connected to Server B as a client');

    socketToB.emit('message_from_a', 'Hello Server B from Server A!');
});

socketToB.on('message_from_b', (data) => {
    console.log('Received from Server B:', data);
});

app.listen(3000, () => {
    console.log('Server A listening on *:3000');
});
