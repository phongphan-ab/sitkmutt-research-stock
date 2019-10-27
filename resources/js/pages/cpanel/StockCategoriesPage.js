import React, { Component } from 'react'
import { connect }  from 'react-redux'

class StockCategoriesPageContainer extends Component {   

    render() {

    }
}

const mapStateToProps = state => ({
    isStockCategoryAddingModalOpen: state.cpanelStockCategoryAddingModal,
    stockCategories: state.stockCategories
})

const StockCategoriesPage = connect(mapStateToProps)(StockCategoriesPageContainer)

export default StockCategoriesPage