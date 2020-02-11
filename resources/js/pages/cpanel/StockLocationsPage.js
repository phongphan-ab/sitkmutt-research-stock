import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Button, Empty, Icon, List, Result, Spin, Tooltip } from 'antd'

import { DeleteStockLocationButton, EditStockLocationButton, StockLocationFormModal } from '~/components'
import DefaultLayout from '~/layouts'
import { fetchStockLocations, openStockLocationFormModal } from '~/scripts/redux/actions'

class StockLocationsPageContainer extends Component {

    componentDidMount() {
        this.props.dispatch(fetchStockLocations())
    }

    render() {
        const {t, stockLocations, isStockLocationsFormModalOpen, dispatch } = this.props

        let content
        if (stockLocations.data && stockLocations.data.length > 0 && !stockLocations.error) {
            content = (
                <List dataSource={stockLocations.data} size="large" bordered
                    renderItem={
                        item => (
                            <List.Item key={item.object_id}
                                actions={[
                                    <EditStockLocationButton object_id={item.object_id} />,
                                    <DeleteStockLocationButton object_id={item.object_id} disabled={item.delete_prevention == true} />
                                ]}
                            >
                                <List.Item.Meta
                                    title={<>{item.title}{!item.is_visible ? (<Tooltip title={t('pages.cpanel_stocklocations.content.list.hidden')}>&nbsp;<Icon type="disconnect" /></Tooltip>) : ''}</>}
                                    description={item.description}
                                />
                            </List.Item>
                        )
                    }
                />
            )
        }
        else if (stockLocations.error) {
            content = (
                <Result
                    status="error"
                    title={t('pages.cpanel_stocklocations.result.error.title')}
                    subTitle={(
                        <>
                            {t('pages.cpanel_stocklocations.result.error.description')}<br />
                            {
                                stockLocations.error.response
                                ? (<small>({t('pages.cpanel_stocklocations.result.error.http_error_code', {code: stockLocations.error.response.status})})</small>)
                                : null
                            }
                        </>
                    )}
                />
            )
        }
        else {
            content = (<Empty description={t('pages.cpanel_stocklocations.result.empty.description')}/>)
        }

        return (
            <DefaultLayout title={t('pages.cpanel_stocklocations.title')}
                operationBtn={
                    <Button type="primary" onClick={() => dispatch(openStockLocationFormModal(true))}>{t('pages.cpanel_stocklocations.actions.button.add')}</Button>
                }
            >
                <Spin tip={t('pages.cpanel_stocklocations.result.loading.title')} spinning={stockLocations.loading}>
                    {content}
                </Spin>
                <StockLocationFormModal visible={isStockLocationsFormModalOpen} />
            </DefaultLayout>
        );
    }
}

const mapStateToProps = state => ({
    isStockLocationsFormModalOpen: state.cpanelStockLocationFormModal,
    stockLocations: state.stockLocations
})

const StockLocationsPageWithTranslation = withTranslation()(StockLocationsPageContainer)
const StockLocationsPage = connect(mapStateToProps)(StockLocationsPageWithTranslation)

export default StockLocationsPage
