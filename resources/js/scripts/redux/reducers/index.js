import { combineReducers } from 'redux';

import antdDrawerMenu from './antdDrawerMenuReducer'
import antdSiderMenu from './antdSiderMenuReducer'

const rootReducer = combineReducers({
    antdDrawerMenu,
    antdSiderMenu
});

export default rootReducer