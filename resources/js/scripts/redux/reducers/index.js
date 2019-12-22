import { combineReducers } from 'redux';

import antdDrawerMenu from './antdDrawerMenuReducer'
import antdSiderMenu from './antdSiderMenuReducer'
import cpanelStockCategoryAddingModal from './cpanelStockCategoryAddingReducer'
import cpanelStockModifyingItem from './cpanelStockItemModifyingReducer'
import cpanelStocksFormModal from './cpanelStocksFormModalReducer'
import frmLoginLoading from './frmLoginLoadingReducer'
import cpanelStocks from './cpanelStocksFetchingReducer'
import stockCategories from './stockCategoriesFetchingReducer'
import stockCategoriesModifyItem from  './stockCategoryModifyItemReducer'

const rootReducer = combineReducers({
    antdDrawerMenu,
    antdSiderMenu,
    cpanelStockCategoryAddingModal,
    cpanelStockModifyingItem,
    cpanelStocksFormModal,
    cpanelStocks,
    frmLoginLoading,
    stockCategories,
    stockCategoriesModifyItem
});

export default rootReducer
