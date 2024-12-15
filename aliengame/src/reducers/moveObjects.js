import { calculateAngle } from '../utils/formulas';
import checkCollisions from './checkCollisions';
import createFlyingObjects from './createFlyingObjects';
import moveBalls from './moveCannonBalls';

function moveObjects(state, action) {
  if (!state.gameState.started) return state;

  const now = (new Date()).getTime();

  let cannonBalls = moveBalls(state.gameState.cannonBalls);
  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  };
  const { x, y } = mousePosition;

  const newState = createFlyingObjects(state);

  let flyingObjects = newState.gameState.flyingObjects.filter(object => (
    (now - object.createdAt) < 4000
  ));

  const angle = calculateAngle(0, 0, x, y);
  const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);

  const cannonBallsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
  const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));

  cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
  flyingObjects = flyingObjects.filter(flyingDisc => (flyingDiscsDestroyed.indexOf(flyingDisc.id)));
  
  return {
    ...newState,
    angle,
    gameState: {
      ...newState.gameState,
      cannonBalls: [...cannonBalls],
      flyingObjects,
    },
  };
}

export default moveObjects;