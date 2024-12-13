/* eslint-disable import/no-anonymous-default-export */
export default (state, initialGameState) => {
    return {
      ...state,
      gameState: {
        ...initialGameState,
        started: true,
      }
    }
};