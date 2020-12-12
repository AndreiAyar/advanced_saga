const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});;
const port = 4001;
let users = []

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/write', (req, res) => {
console.log('hitted')
    res.json('ok')

});

// app.use(express.static(path.join(__dirname, 'public')));
app.get('/remove', (req, res) => {
    const fs = require('fs');
 
    fs.unlink('./../client/src/a.txt', function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    }); 
    
});


let numUsers = 0;

io.on('connection', (socket) => {
    let addedUser = false;
    console.log("New client connected");

    socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
    });

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
     //   console.log(socket.username)
        console.log('available users', users)

        // we tell the client to execute 'new message'
        io.sockets.emit('pull:message', {
            username: socket.username,
            message: data,
            id:socket.id
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;
        console.log(username)

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        users.push({username, id:socket.id})
        socket.emit('login', {
            numUsers: numUsers
        });
        io.sockets.emit('pull:users', {
            users,

        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
         //let index =   users.findIndex(socket.username)
            console.log( socket.username)
            let userIndex = users.findIndex(({id}) => id === socket.id)
            console.log(userIndex)
           users.splice(userIndex, 1)
          console.log('left....')
            console.log('available users', users)
            io.sockets.emit('pull:users', {
                users,


            });
            // echo globally that this client has left //
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});