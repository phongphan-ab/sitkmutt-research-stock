import { createStore } from 'redux';
import rootReducer from '~/scripts/redux/reducers';

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);