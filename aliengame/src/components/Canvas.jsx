import React from 'react';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
import CannonBall from "./CannonBall";
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
//import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
//import LoginButton from './LoginButton';
import Leaderboard from './Leaderboard';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

  return (
    <svg
      id="alien-game-canvas"
      onClick={props.shoot}
      onMouseMove={props.trackMouse}
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      {props.gameState.cannonBalls.map(cannonBall => (
        <CannonBall
          key={cannonBall.id}
          position={cannonBall.position}
        />
      ))}
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={0} />
      { !props.gameState.started &&
      <g>
        <StartGame onClick={() => props.startGame()} />
        <Title />
        <Leaderboard currentPlayer={props.currentPlayer} leaderboard={props.players} />
      </g>
      }
      { props.gameState.flyingObjects.map(flyingObject => (
        <FlyingObject
          key={flyingObject.id}
          position={flyingObject.position}
        />
      ))}
    </svg>
  );
};

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })),
  shoot: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired,
};

Canvas.defaultProps = {
  currentPlayer: null,
  players: null,
};

export default Canvas;