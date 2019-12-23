import { combineReducers } from 'redux';

import antdDrawerMenu from './antdDrawerMenuReducer'
import antdSiderMenu from './antdSiderMenuReducer'
import cpanelStockCategoryAddingModal from './cpanelStockCategoryAddingReducer'
import cpanelStockModifyingItem from './cpanelStockItemModifyingReducer'
import cpanelStockLocationFormModal from './cpanelStockLocationFormModalReducer'
import cpanelStocksFormModal from './cpanelStocksFormModalReducer'
import frmLoginLoading from './frmLoginLoadingReducer'
import cpanelStocks from './cpanelStocksFetchingReducer'
import stockCategories from './stockCategoriesFetchingReducer'
import stockCategoriesModifyItem from  './stockCategoryModifyItemReducer'
import stockLocationModifyItem from  './stockLocationModifyItemReducer'
import stockLocations from './stockLocationsFetchingReducer'

const rootReducer = combineReducers({
    antdDrawerMenu,
    antdSiderMenu,
    cpanelStockCategoryAddingModal,
    cpanelStockLocationFormModal,
    cpanelStockModifyingItem,
    cpanelStocksFormModal,
    cpanelStocks,
    frmLoginLoading,
    stockCategories,
    stockCategoriesModifyItem
    stockLocations,
    stockLocationModifyItem,
});

export default rootReducer
