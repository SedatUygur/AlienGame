import { calculateAngle } from '../utils/formulas';
import createFlyingObjects from './createFlyingObjects';

function moveObjects(state, action) {
  const now = (new Date()).getTime();
  const mousePosition = action.mousePosition || {
    x: 0,
    y: 0,
  };
  const { x, y } = mousePosition;

  const newState = createFlyingObjects(state);
  const angle = calculateAngle(0, 0, x, y);
  const flyingObjects = newState.gameState.flyingObjects.filter(object => (
    (now - object.createdAt) < 4000
  ));
  
  return {
    ...newState,
    angle,
    gameState: {
      ...newState.gameState,
      flyingObjects,
    },
  };
}

export default moveObjects;