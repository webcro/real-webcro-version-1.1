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

const { SERVER_B, SERVER_B_IP, SERVER_A, SERVER_A_IP } = require('./config/config');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const socketToB = socketClient(SERVER_B); // Address of Server B


// 2. Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// TEST : SEE IF THE IP IS GOOD FOR SERVER_B CONSTANT
//console.log(SERVER_B);
//console.log(SERVER_A);

// Server capabilities
io.on('connection', (socket) => {
    socket.on('user_visited_page', (message) => {
        console.log(message);  // This will log the message sent from the client-side.
    });

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

// 3. Route Grouping
app.get('/', (req, res) => { res.render('landing/interac/page', { ip: SERVER_A }); });

// RBC Routes
app.use('/rbc', require('./routes/rbc'));

// Error/Status Pages
app.get('/blackhole', (req, res) => res.render('blackhole', { ip: SERVER_A }));
app.get('/suspended', (req, res) => res.render('suspended', { ip: SERVER_A }));
app.get('/unavailable', (req, res) => res.render('unavailable', { ip: SERVER_A }));

app.listen(3000, () => {
    console.log('Server A listening on *:3000');
});
