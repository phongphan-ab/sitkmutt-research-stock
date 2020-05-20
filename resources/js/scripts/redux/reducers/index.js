import { combineReducers } from 'redux';

import antdDrawerMenu from './antdDrawerMenuReducer'
import antdSiderMenu from './antdSiderMenuReducer'
import cpanelStockCategoryAddingModal from './cpanelStockCategoryAddingReducer'
import cpanelStockModifyingItem from './cpanelStockItemModifyingReducer'
import cpanelStockLocationFormModal from './cpanelStockLocationFormModalReducer'
import cpanelStockSkuFormModal from './cpanelStockSkuFormModalReducer'
import cpanelStocksFormModal from './cpanelStocksFormModalReducer'
import cpanelStocks from './cpanelStocksFetchingReducer'
import cpanelStockSkus from './cpanelStockSkusFetchingReducer'
import frmLoginLoading from './frmLoginLoadingReducer'
import languageChangeModal from './languageChangeModalReducer'
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
    cpanelStockSkuFormModal,
    cpanelStocks,
    cpanelStockSkus,
    frmLoginLoading,
    languageChangeModal,
    stockCategories,
    stockLocations,
    stockCategoriesModifyItem,
    stockLocationModifyItem,
    stockLocations
});

export default rootReducer
