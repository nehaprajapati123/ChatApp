// node server which will be handle socket io connections
const io = require('socket.io')(8000)
const users={};

io.on('connection',socket=>{
    // if any new user joins, let other users connected to the server
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    // if someone send a message, broadcast it to other people
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });


    // if someone leaves the chat, let other know
    socket.on('disconnect', name=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    });
});
