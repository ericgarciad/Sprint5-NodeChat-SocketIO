const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');
 
const app = express();
let server = http.createServer(app);
 
// Use the path to send public folder to our Server
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3001; 

// Use static content to send public folder
app.use(express.static(publicPath)); 

// Create the communication with the backend and at the end of the page we export "io"
module.exports.io = socketIO(server);

// Separate the sockets code to make a clean structure code and we call here to run in our Servers
require('./sockets/socket');



server.listen(port, (err) => { 

    if (err) throw new Error(err);

    console.log(`Server running in port ${ port }`);

});