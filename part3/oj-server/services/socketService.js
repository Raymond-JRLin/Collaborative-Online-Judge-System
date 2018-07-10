module.exports = function (io) {
  // collaboration sessions
  var collaborations = [];
  // map from socketId to sessionId
  var socketIdToSessionId = [];

  io.on('connection', socket => {
    let sessionId = socket.handshake.query["sessionId"];

    socketIdToSessionId[socket.id] = sessionId;

    // add socket.io to corresponding collaboration session participants
    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        'participants': []
      };
    }
    collaborations[sessionId]['participants'].push(socket.id);

    // socket event listeners
    socket.on('change', delta => {
      console.log("change" + socketIdToSessionId[socket.id] + " " + delta);
      // let sessionId = socketIdToSessionId[socket.id];
      // if (sessionId in collaborations) {
      //   let participants = collaborations[sessionId]['participants'];
      //   for (let i = 0; i < participants.length; i++) {
      //     if (socket.id != participants[i]) {
      //       io.to(participants[i]).emit("change", delta);
      //     }
      //   }
      // } else {
      //   console.log("WARNING: could not tie socket_id to any collaboration");
      // }
      // use the same function
      forwardEvents(socket.id, 'change', delta);
    });

    // handle cursorMove events
    socket.on('cursorMove', cursor => {
      console.log("cursorMove" + socketIdToSessionId[socket.id] + " " + cursor);
      let sessionId = socketIdToSessionId[socket.id];
      cursor = JSON.parse(cursor);
      cursor['socketId'] = socket.id;
      // if (sessionId in collaborations) {
      //   let participants = collaborations[sessionId]['participants'];
      //   for (let i = 0; i < participants.length; i++) {
      //     if (socket.id != participants[i]) {
      //       io.to(participants[i]).emit("cursorMove", cursor);
      //     }
      //   }
      // } else {
      //   console.log("WARNING: could not tie socket_id to any collaboration");
      // }
      // use same function
      forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
    });

    function forwardEvents(socketId, eventName, dataString) {
      let sessionId = socketIdToSessionId[socketId];

      if (sessionId in collaborations) {
        let participants = collaborations[sessionId]['participants'];
        for (let i = 0; i < participants.length; i++) {
          if (socket.id != participants[i]) {
            io.to(participants[i]).emit(eventName, dataString);
          }
        }
      } else {
        console.log("WARNING: could not tie socket_id to any collaboration");
      }
    }

    // console.log(socket);
    //
    // var message = socket.handshake.query['message'];
    // console.log(message);
    //
    // io.to(socket.id).emit('message', 'haha from server');
  });
}
