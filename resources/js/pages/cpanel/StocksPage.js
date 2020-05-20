import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Divider, Dropdown, Empty, Icon, Menu, Modal, Result, Spin, Table, Tooltip, Typography } from 'antd'
import Axios from 'axios'

import { CpanelStocksFormModal, ErrorModal } from '~/components'
import DefaultLayout from '~/layouts'
import { editStockItem, fetchCpanelStocks, fetchCpanelStocksSuccess, openCpanelStocksFormModal } from '~/scripts/redux/actions'

const { Text } = Typography;
const { confirm } = Modal;

class StocksPageContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addButtonLoading: false,
            editModalLoading: false
        }
    }

    componentDidMount() {
        this.props.fetchCpanelStocks()
    }

    addStockButtonHandler = () => {
        const { openCpanelStocksFormModal } = this.props
        openCpanelStocksFormModal(true)
    }

    onTableChangeHandler = (pagination) => {
        let pager = { ...this.props.stocks.pagination }
        pager.current = pagination.current
        this.props.fetchCpanelStocks(pager)
    }

    render() {
        const { t, stocks, isCpanelStocksFormModalOpen } = this.props

        let columns = [
            {
                title: t('pages.cpanel_stocks.content.table.header.id'),
                key: 'id',
                ellipsis: true,
                sorter: true,
                width: 304,
                render: (data) => <Link to={`/cpanel/stocks/${data.object_id}`}>{data.object_id}</Link>
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.name'),
                key: 'title',
                render: (data) => <>{data.title} {!data.is_visible ? (<Tooltip title="ถูกซ่อนไว้">&nbsp;<Icon type="disconnect" /></Tooltip>) : null}</>
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.category'),
                key: 'category',
                render: (data) => <>{data.category.title}</>
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.total_amount'),
                key: 'amount_all',
                width: 100
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.borrowed_amount'),
                key: 'amount_borrowed',
                width: 100
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.discarded_amount'),
                key: 'amount_discarded',
                width: 100
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.remaining_anmount'),
                key: 'amount_remaining',
                width: 100
            },
            {
                title: t('pages.cpanel_stocks.content.table.header.actions'),
                width: 96,
                render: (data) => {
                    let deleting = false
                    let deleteConfirm = () => {
                        confirm({
                            title: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.title'),
                            content: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.description', {stock_name: data.title}),
                            okText: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.buttons.ok'),
                            okType: 'danger',
                            cancelText: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.buttons.cancel'),
                            cancelButtonProps: {
                                disabled: deleting
                            },
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    await Axios.delete(`/stocks/${data.object_id}`)
                                        .then(response => {
                                            let rawData = stocks.data
                                            let stockData = rawData.data
                                            stockData = stockData.filter(item => item.object_id != data.object_id)
                                            rawData.data = stockData
                                            this.props.putStockDataToState(rawData)
                                        })
                                        .catch(error => {
                                            ErrorModal(error)
                                        })
                                        .finally(() => {
                                            resolve(true)
                                        })
                                })
                                .catch((error) => console.log(error))
                            }
                        });
                    }

                    let editMenuOnClickHandler = (e) => {
                        let { openCpanelStocksFormModal, editStockItem } = this.props

                        this.setState({
                            editModalLoading: true
                        })

                        Axios.get(`/stocks/${data.object_id}`)
                            .then(async response => {
                                await editStockItem(response.data)
                                openCpanelStocksFormModal(true)
                            })
                            .catch(error => {
                                ErrorModal(error)
                            })
                            .finally(() => {
                                this.setState({
                                    editModalLoading: false
                                })
                            })
                    }

                    let menu = (
                        <Menu>
                            <Menu.Item onClick={editMenuOnClickHandler} key={data.object_id}>
                                <a><Icon type="edit" /> {t('pages.cpanel_stocks.content.table.body.actions.dropdown.edit')}</a>
                            </Menu.Item>
                            <Menu.Item onClick={deleteConfirm}>
                                <a><Text type="danger"><Icon type="delete" /> {t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.title')}</Text></a>
                            </Menu.Item>
                        </Menu>
                    )

                    return (<>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a><Icon type="more" />{t('pages.cpanel_stocks.content.table.body.actions.title')}</a>
                        </Dropdown>
                    </>)
                }
            }
        ]

        let rowKey = (record) => {
            return record.object_id
        }

        let tableLocale = {
            emptyText: () => {
                if (stocks.error) {
                    console.log(stocks.error)
                    return <Result status="error" title={t('pages.cpanel_stocks.result.error.title')}
                        subTitle={(
                            <>
                                {t('pages.cpanel_stocks.result.error.description')}<br />
                                {stocks.error.response ? <small>({t('pages.cpanel_stocks.result.error.http_error_code', {code: stocks.error.response.status})})</small> : null}
                            </>
                        )}
                    />
                }
                return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('pages.cpanel_stocks.result.empty.description')} />
            }
        }

        return (
            <>
                <Spin size="large" spinning={this.state.editModalLoading}>
                    <DefaultLayout title={t('pages.cpanel_stocks.title')}
                        operationBtn={
                            <Button type="primary" loading={this.state.addButtonLoading} onClick={this.addStockButtonHandler}>{t('pages.cpanel_stocks.action.buttons.add')}</Button>
                        }
                    >
                        <Table dataSource={stocks.data ? stocks.data.data : null} columns={columns} rowKey={rowKey} loading={stocks.loading} locale={tableLocale} pagination={stocks.pagination} onChange={this.onTableChangeHandler}/>
                        <CpanelStocksFormModal visible={isCpanelStocksFormModalOpen} stockCategory={this.props.stockCategories}/>
                    </DefaultLayout>
                </Spin>
            </>
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.cpanelStocks,
    isCpanelStocksFormModalOpen: state.cpanelStocksFormModal,
    stockCategories: state.stockCategories
})

const mapDispatchToProps = dispatch => ({
    fetchCpanelStocks: pagination => dispatch(fetchCpanelStocks(pagination)),
    fetchStockCategories: () => dispatch(fetchStockCategories()),
    openCpanelStocksFormModal: isOpen => dispatch(openCpanelStocksFormModal(isOpen)),
    putStockDataToState: data => dispatch(fetchCpanelStocksSuccess(data)),
    editStockItem: data => dispatch(editStockItem(data))
})

const StocksPageWithTranslation = withTranslation()(StocksPageContainer)
const StocksPage = connect(mapStateToProps, mapDispatchToProps)(StocksPageWithTranslation)

export default StocksPage
