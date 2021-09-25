const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'/public')));

//middlewares
app.use(express.json());
app.use(morgan('dev'));

const server = app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`)
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection',socket.id);
    socket.on('chat:message',(data) => {
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});



