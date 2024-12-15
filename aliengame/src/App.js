import React, {Component} from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { withAuth0 } from '@auth0/auth0-react';
import Canvas from './components/Canvas';
import { getCanvasPosition } from './utils/formulas';
import { getConfig } from "./config";

const config = getConfig();

class App extends Component {
  constructor(props) {
    super(props);
    this.currentPlayer = null;
    this.socket = null;
    this.shoot = this.shoot.bind(this);
  }

  async componentDidMount() {
    const { isAuthenticated, getAccessTokenSilently, user } = this.props.auth0;
    if (isAuthenticated) {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: config.audience,
          scope: config.scopeForAccessToken,
        },
      });
      this.currentPlayer = {
        id: user.sub,
        maxScore: 0,
        name: user.name,
        picture: user.picture,
      };
      this.props.loggedIn(this.currentPlayer);
      this.socket = io('http://localhost:3001', {
        query: `token=${accessToken}`,
      });

      this.socket.on('players', (players) => {
        this.props.leaderboardLoaded(players);
        players.forEach((player) => {
          if (player.id === this.currentPlayer.id) {
            this.currentPlayer.maxScore = player.maxScore;
          }
        });
      });
    }

    setInterval(() => {
      this.props.moveObjects(this.canvasMousePosition);
    }, 10);

    window.onresize = () => {
      const cnv = document.getElementById('alien-game-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };

    window.onresize();
  }

  componentDidUpdate(nextProps, prevState) {
    if (!nextProps.gameState.started && this.props.gameState.started) {
      if (!this.currentPlayer) return;

      if (this.currentPlayer.maxScore < this.props.gameState.kills) {
        this.socket.emit('new-max-score', {
          ...this.currentPlayer,
          maxScore: this.props.gameState.kills,
        });
      }
    }
  }

  shoot() {
    this.props.shoot(this.canvasMousePosition);
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        currentPlayer={this.props.currentPlayer}
        gameState={this.props.gameState}
        players={this.props.players}
        shoot={this.shoot}
        startGame={this.props.startGame}
        trackMouse={event => (this.trackMouse(event))}
      />
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  flyingObjects: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
  })).isRequired,
  gameState: PropTypes.shape({
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
    started: PropTypes.bool.isRequired,
  }).isRequired,
  leaderboardLoaded: PropTypes.func.isRequired,
  loggedIn: PropTypes.func.isRequired,
  moveObjects: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  shoot: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

App.defaultProps = {
  currentPlayer: null,
  players: null,
};

export default withAuth0(App);
