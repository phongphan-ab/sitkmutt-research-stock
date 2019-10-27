import { combineReducers } from 'redux';

import antdDrawerMenu from './antdDrawerMenuReducer'
import antdSiderMenu from './antdSiderMenuReducer'
import cpanelStockCategoryAddingModal from './cpanelStockCategoryAddingReducer'
import frmLoginLoading from './frmLoginLoadingReducer'
import stockCategories from './stockCategoriesFetchingReducer'

const rootReducer = combineReducers({
    antdDrawerMenu,
    antdSiderMenu,
    cpanelStockCategoryAddingModal,
    frmLoginLoading,
    stockCategories,
});

export default rootReducer