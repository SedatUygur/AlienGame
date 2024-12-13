import React from 'react';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import CannonBase from './CannonBase';
import CannonPipe from './CannonPipe';
//import CannonBall from "./CannonBall";
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

  const leaderboard = [
    { id: 'd4', maxScore: 235, name: 'React', picture: 'https://unavatar.io/x/reactjs', },
    { id: 'a1', maxScore: 82, name: 'Redux.io', picture: 'https://unavatar.io/x/ReduxFramework', },
    { id: 'c3', maxScore: 99, name: 'Auth0', picture: 'https://unavatar.io/x/auth0', },
    { id: 'b2', maxScore: 129, name: 'ReactDOM', picture: 'https://unavatar.io/x/ReactDOM', },
    { id: 'e5', maxScore: 34, name: 'React & Redux', picture: 'https://unavatar.io/x/React_Rd', },
    { id: 'f6', maxScore: 153, name: 'Web Vitals', picture: 'https://unavatar.io/x/WebVitals', },
  ];

  return (
    <svg
      id="alien-game-canvas"
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
      <CannonPipe rotation={props.angle} />
      <CannonBase />
      <CurrentScore score={0} />
      { !props.gameState.started &&
      <g>
        <StartGame onClick={() => props.startGame()} />
        <Title />
        <Leaderboard currentUserId={'d4'} leaderboard={leaderboard} />
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
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.number.isRequired,
  }).isRequired,
  startGame: PropTypes.func.isRequired,
  trackMouse: PropTypes.func.isRequired,
};

export default Canvas;