import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Button, Empty, Icon, List, Result, Spin, Tooltip } from 'antd'
import { connect }  from 'react-redux'

import { DeleteStockCategoryButton, EditStockCategoryButton, StockCategoryFormModal } from '~/components'
import DefaultLayout from '~/layouts'
import { fetchStockCategories, openStockCategoryModalForm } from '~/scripts/redux/actions'

class StockCategoriesPageContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchStockCategories())
    }

    render() {
        const { t, stockCategories, isStockCategoryAddingModalOpen, dispatch } = this.props

        let content
        if (stockCategories.data && stockCategories.data.length > 0 && !stockCategories.error) {
            content = (
                <List dataSource={stockCategories.data} size="large" bordered
                    renderItem={
                        item => (
                            <List.Item key={item.object_id}
                                actions={[
                                    <EditStockCategoryButton object_id={item.object_id} />,
                                    <DeleteStockCategoryButton object_id={item.object_id} disabled={item.delete_prevention} />
                                ]}
                            >
                                <List.Item.Meta
                                    title={<>{item.title}{!item.is_visible ? (<Tooltip title={t('pages.cpanel_stockcategories.content.list.hidden')}>&nbsp;<Icon type="disconnect" /></Tooltip>) : ''}</>}
                                    description={item.description}
                                />
                            </List.Item>
                        )
                    }
                />
            )
        }
        else if (stockCategories.error) {
            content = (
                <Result
                    status="error"
                    title={t('pages.cpanel_stockcategories.result.error.title')}
                    subTitle={(
                        <>
                            {t('pages.cpanel_stockcategories.result.error.description')}<br />
                        </>
                    )}
                />
            )
        }
        else {
            content = (<Empty description={t('pages.cpanel_stockcategories.result.empty.description')}/>)
        }

        return (
            <DefaultLayout title={t('pages.cpanel_stockcategories.title')}
                operationBtn={
                    <Button type="primary" onClick={() => dispatch(openStockCategoryModalForm(true))}>{t('pages.cpanel_stockcategories.actions.button.add')}</Button>
                }
            >
                <Spin tip={t('pages.cpanel_stockcategories.result.loading.title')} spinning={stockCategories.loading}>
                    {content}
                </Spin>
                <StockCategoryFormModal visible={isStockCategoryAddingModalOpen} />
            </DefaultLayout>
        );
    }
}

const mapStateToProps = state => ({
    isStockCategoryAddingModalOpen: state.cpanelStockCategoryAddingModal,
    stockCategories: state.stockCategories
})

const StockCategoriesPageWithTranslation = withTranslation()(StockCategoriesPageContainer)
const StockCategoriesPage = connect(mapStateToProps)(StockCategoriesPageWithTranslation)

export default StockCategoriesPage
