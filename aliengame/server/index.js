import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const app = express();
const server = createServer(app);
const io = new Server(server);

const client = jwksClient({
    jwksUri: process.env.jwksUri,
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
});

const players = [];

const verifyPlayer = (token, cb) => {
    const uncheckedToken = jwt.decode(token, {complete: true});
    const kid = uncheckedToken.header.kid;
    client.getSigningKey(kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      jwt.verify(token, signingKey, cb);
    });
};
  
const newMaxScoreHandler = (payload) => {
    let foundPlayer = false;
    players.forEach((player) => {
      if (player.id === payload.id) {
        foundPlayer = true;
        player.maxScore = Math.max(player.maxScore, payload.maxScore);
      }
    });
    if (!foundPlayer) {
      players.push(payload);
    }
    io.emit('players', players);
};

app.get('/', (req, res) => {
  res.send(players);
});

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;

  verifyPlayer(token, (err) => {
    if (err) socket.disconnect();

    io.emit('players', players);
  });

  socket.on('new-max-score', newMaxScoreHandler);
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});