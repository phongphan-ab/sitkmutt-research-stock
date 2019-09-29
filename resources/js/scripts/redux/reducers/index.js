import { combineReducers } from 'redux';

import antdDrawerMenu from './antdDrawerMenuReducer'
import antdSiderMenu from './antdSiderMenuReducer'
import frmLoginLoading from './frmLoginLoadingReducer'

const rootReducer = combineReducers({
    antdDrawerMenu,
    antdSiderMenu,
    frmLoginLoading
});

export default rootReducer