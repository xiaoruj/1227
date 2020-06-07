export function createStore(reducers) {
  let currentState;
  let currentListener = null;
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducers(currentState, action);
    currentListener && currentListener();
  }
  function subscribe(listener) {
    currentListener = listener;
    return function () {
      currentListener = null;
    };
  }
  currentState = reducers(currentState, { type: "@@INIT-MY-REDUX-class1227" });
  return {
    getState,
    dispatch,
    subscribe,
  };
}
export function combineReducers(reducers) {
  return function (prevState = {}, action) {
    const reducerKeys = Object.keys(reducers);
    const currentState = reducerKeys.reduce((currentState, reducerKey) => {
      const reducer = reducers[reducerKey];
      currentState[reducerKey] = reducer(prevState[reducerKey], action);
      return currentState;
    }, {});
    return currentState;
  };
}
export default {
  createStore,
  combineReducers,
};
