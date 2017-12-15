const { generateMessage, generateLocationMessage } = require('../server/utils/message');
const { isRealString } = require('../server/utils/validation.js');
const { Users } = require('../server/utils/users');

const users = new Users();

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New User connected');

    socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.name)) {
        return callback('Name and room name are required');
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
      callback();
    });

    socket.on('createMessage', (message, callback) => {
      console.log('createMessage', message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback();
    });

    socket.on('createLocationMessage', (coords) => {
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
      const user = users.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has logged out`));
      }
    });
  });
};
