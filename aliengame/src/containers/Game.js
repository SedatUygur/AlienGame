import { connect } from 'react-redux';
import App from '../App';
import { leaderboardLoaded, loggedIn, moveObjects, shoot, startGame } from '../actions/index';

const mapStateToProps = state => ({
  angle: state.angle,
  currentPlayer: state.currentPlayer,
  gameState: state.gameState,
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  leaderboardLoaded: (players) => {
    dispatch(leaderboardLoaded(players));
  },
  loggedIn: (player) => {
    dispatch(loggedIn(player));
  },
  moveObjects: (mousePosition) => {
    dispatch(moveObjects(mousePosition));
  },
  shoot: (mousePosition) => {
    dispatch(shoot(mousePosition))
  },
  startGame: () => {
    dispatch(startGame());
  },
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;