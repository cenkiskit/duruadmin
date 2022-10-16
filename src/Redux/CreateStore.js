// Packages
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';

import Reducers from './Reducers';
import rootSaga from './Sagas';

const configureStore = rootReducer => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    let sagasManager = sagaMiddleware.run(rootSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware,
    };
};

export default () => {
    let finalReducers = Reducers;

    let { store } = configureStore(finalReducers);

    return {
        store,
    };
};
