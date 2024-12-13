import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
//const jwt = require('jsonwebtoken');
//const jwksClient = require('jwks-rsa');

const app = express();
const server = createServer(app);
const io = new Server(server);

const client = jwksClient({
    jwksUri: 'https://dev-6aiprmtpfbbrrq7n.eu.auth0.com/.well-known/jwks.json',
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
});

const players = [
    { id: 'd4', maxScore: 235, name: 'React', picture: 'https://unavatar.io/x/reactjs', },
    { id: 'a1', maxScore: 82, name: 'Redux.io', picture: 'https://unavatar.io/x/ReduxFramework', },
    { id: 'c3', maxScore: 99, name: 'Auth0', picture: 'https://unavatar.io/x/auth0', },
    { id: 'b2', maxScore: 129, name: 'ReactDOM', picture: 'https://unavatar.io/x/ReactDOM', },
    { id: 'e5', maxScore: 34, name: 'React & Redux', picture: 'https://unavatar.io/x/React_Rd', },
    { id: 'f6', maxScore: 153, name: 'Web Vitals', picture: 'https://unavatar.io/x/WebVitals', },
];

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

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});