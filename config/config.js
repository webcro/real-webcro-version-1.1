const SERVER_B_IP = process.env.SERVER_B_IP || 'localhost'; // Default to 'localhost' if not set
const SERVER_B_PORT = process.env.SERVER_B_PORT || '4000';  // Default to '4000' if not set
const SERVER_B = `http://${SERVER_B_IP}:${SERVER_B_PORT}`;

module.exports = {
    SERVER_B,
    SERVER_B_IP
};
