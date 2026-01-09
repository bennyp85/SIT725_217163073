const express = require('express');
const app = express();
const http = require('http').createServer(app); // Create HTTP server from app
const io = require('socket.io')(http);          // Pass http server to socket.io

const PORT = process.env.PORT || 3000;

// ----- Shared server state -----
let p = 0.5;
let shots = 0;
let ones = 0;

// Serve static files from /public
app.use(express.static('public'));

// ----- Host control -----
let hostId = null;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Assign first user as host (minimal rule)
  if (hostId === null) {
    hostId = socket.id;
    console.log('Host assigned:', hostId);
  }

  // Send current state + whether this socket is host
  socket.emit('state', { p, shots, ones, hostId });

  // Host-only: update p
  socket.on('set_p', (newP) => {
    if (socket.id !== hostId) return; // ignore non-host

    // clamp to [0,1]
    const clamped = Math.max(0, Math.min(1, Number(newP)));
    if (Number.isNaN(clamped)) return;

    p = clamped;

    // broadcast updated state (no bit here)
    io.emit('state', { p, shots, ones, hostId });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // If host leaves, pick a new host (first connected remaining)
    if (socket.id === hostId) {
      hostId = null;
      const sockets = Array.from(io.sockets.sockets.keys());
      if (sockets.length > 0) hostId = sockets[0];
      io.emit('state', { p, shots, ones, hostId });
      console.log('New host:', hostId);
    }
  });
});


setInterval(() => {
  const bit = Math.random() < p ? 1 : 0;
  shots += 1;
  ones += bit;

  io.emit('measurement', { bit, shots, ones, p });
}, 500);

// Start server
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});