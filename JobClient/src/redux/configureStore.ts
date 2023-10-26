/**
 * Create the store with dynamic reducers
 */
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import saga from "./saga";


const configureStoreFunction = (initialState = {}) => {
  console.log('user reducer');
  
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware<any>(reduxSagaMonitorOptions);

  // Create the store with these middlewares
  // - sagaMiddleware: Makes redux-sagas work
  
  const middleware = [sagaMiddleware];

  const store = configureStore({
    reducer,
    middleware,
    preloadedState: initialState
  });

  // Extensions
  sagaMiddleware.run(saga);
  // store.runSaga = sagaMiddleware.run;
  return store;
};

export default configureStoreFunction;
