import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Descriptions, Dropdown, Icon, Menu, Modal, Spin, Table, Typography } from 'antd'
import Axios from 'axios'
import Moment from 'moment'

import DefaultLayout from '~/layouts'
import { fetchCpanelStockSkus, fetchCpanelStockSkusSuccess, openCpanelStockSkuFormModal } from '~/scripts/redux/actions'
import { CpanelStockSkuFormModal } from '~/components'

const StockByIdPage = () => {
    const { stock_id } = useParams()
    const [ pageLoading, setPageLoading ] = useState(true)
    const [ disableCancelDeleteSkuState, setDisableCancelDeleteSkuState ] = useState(false)
    const [ stockSkuIdState, setStockSkuIdState ] = useState(false)
    const [materialDataState, setMaterialDataState] = useState({})
    const stockSku = useSelector(state => state.cpanelStockSkus)
    const dispatch = useDispatch()
    const addModalOpening = useSelector(state => state.cpanelStockSkuFormModal)
    const { t } = useTranslation()
    const { confirm } = Modal
    const { Text } = Typography

    useEffect(() => {
        const fetchData = async () => {
            try {
                const materialData = await Axios.get(`/stocks/${stock_id}`)
                setMaterialDataState(materialData.data)

                dispatch(fetchCpanelStockSkus(stock_id, stockSku.pagination))
            }
            catch (error) {
                console.error(error)
            }

            setPageLoading(false)
        }

        fetchData();
    }, []);

    const onAddButtonClickHandler = () => {
        dispatch(openCpanelStockSkuFormModal(true))
    }

    const onTableChangeHandler = (pagination) => {
        let pager = { ...stockSku.pagination }
        pager.current = pagination.current
        dispatch(fetchCpanelStockSkus(stock_id, pager))
    }

    const onClickEditHandler = stock_sku_id => {
        setPageLoading(true)
        setStockSkuIdState(stock_sku_id)
    }

    const onClickDeleteHandler = stock_sku_id => {
        confirm({
            title: t('pages.cpanel_stocksku.content.table.body.actions.dropdown.delete.alert.title'),
            content: t('pages.cpanel_stocksku.content.table.body.actions.dropdown.delete.alert.description', {stock_sku_id: stock_sku_id}),
            okText: t('pages.cpanel_stocksku.content.table.body.actions.dropdown.delete.alert.buttons.ok'),
            okType: 'danger',
            cancelText: t('pages.cpanel_stocksku.content.table.body.actions.dropdown.delete.alert.buttons.cancel'),
            cancelButtonProps: {
                disabled: disableCancelDeleteSkuState
            },
            onOk: () => {
                setDisableCancelDeleteSkuState(true)
                return new Promise(async (resolve, reject) => {
                    await Axios.delete(`/stocks/${stock_id}/skus/${stock_sku_id}`)
                        .then(response => {
                            let rawData = stockSku.data
                            let skuData = rawData.data
                            skuData = skuData.filter(item => item.object_id != stock_sku_id)
                            rawData.data = skuData
                            dispatch(fetchCpanelStockSkusSuccess(rawData))
                        })
                        .catch(error => {
                            console.log(error)
                            ErrorModal(error)
                        })
                        .finally(() => {
                            resolve(true)
                        })
                })
                .catch(error => console.log(error))
                .finally(setDisableCancelDeleteSkuState(false))
            }
        })
    }

    const tableColumn = [
        {
            key: "id",
            title: t("pages.cpanel_stocksku.content.table.header.id"),
            dataIndex: "object_id"
        },
        {
            key: "code",
            title: t("pages.cpanel_stocksku.content.table.header.code"),
            dataIndex: "code"
        },
        {
            title: t("pages.cpanel_stocksku.content.table.header.serial_no"),
            key: "serial_no",
            dataIndex: "serial_no"
        },
        {
            title: t("pages.cpanel_stocksku.content.table.header.location"),
            key: "location",
            render: data => <>{data.location.title}</>
        },
        {
            title: t("pages.cpanel_stocksku.content.table.header.discarded"),
            key: "is_discarded",
            render: data => data.discarded_at ? (<>{t("pages.cpanel_stocksku.content.table.body.discarded.no_discard")}</>) : (<>{t("pages.cpanel_stocksku.content.table.body.discarded.discarded")}</>)
        },
        {
            title: t("pages.cpanel_stocksku.content.table.header.actions"),
            render: data => {
                let menu = (
                    <Menu>
                        <Menu.Item onClick={e => onClickEditHandler(data.object_id)}>
                            <a><Icon type="edit" /> {t("pages.cpanel_stocksku.content.table.body.actions.dropdown.edit")}</a>
                        </Menu.Item>
                        <Menu.Item onClick={e => onClickDeleteHandler(data.object_id)}>
                            <a><Text type="danger"><Icon type="delete" /> {t("pages.cpanel_stocksku.content.table.body.actions.dropdown.delete.title")}</Text></a>
                        </Menu.Item>
                    </Menu>
                )

                return (<>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a><Icon type="more" /> {t("pages.cpanel_stocksku.content.table.body.actions.title")}</a>
                    </Dropdown>
                </>)
            }
        }
    ]

    let tableRowKey = (record) => {
        return record.object_id
    }

    return (
        <>
            <Spin size="large" spinning={pageLoading}>
                <DefaultLayout
                    title={t("pages.cpanel_stocksku.title")}
                    subtitle={materialDataState.data?.object_id}
                    descriptionItems={[
                        <Descriptions.Item key="title" label={t("pages.cpanel_stocksku.description_items.title")}>{materialDataState.data?.title}</Descriptions.Item>,
                        <Descriptions.Item key="category" label={t("pages.cpanel_stocksku.description_items.category")}>{materialDataState.data?.category.title}</Descriptions.Item>,
                        <Descriptions.Item key="is_visible" label={t("pages.cpanel_stocksku.description_items.is_visible.title")}>{materialDataState.data?.is_visible ? t("pages.cpanel_stocksku.description_items.is_visible.value.true") : t("pages.cpanel_stocksku.description_items.is_visible.value.false")}</Descriptions.Item>,
                        <Descriptions.Item key="created_at" label={t("pages.cpanel_stocksku.description_items.created_date")}>{Moment(materialDataState.data?.created_at).locale('th').format('D MMM YYYY HH:mm:ss')}</Descriptions.Item>,
                        <Descriptions.Item key="updated_at" label={t("pages.cpanel_stocksku.description_items.updated_date")}>{Moment(materialDataState.data?.updated_at).locale('th').format('D MMM YYYY HH:mm:ss')}</Descriptions.Item>
                    ]}
                    operationBtn={[
                        <Button key="addButton" type="primary" onClick={(e) => onAddButtonClickHandler()}>{t("pages.cpanel_stocksku.actions.buttons.add")}</Button>
                    ]}
                >
                    <Table columns={tableColumn} dataSource={stockSku.data?.data} rowKey={tableRowKey} pagination={stockSku.pagination} onChange={onTableChangeHandler} loading={stockSku.loading}/>
                </DefaultLayout>
            </Spin>
            <CpanelStockSkuFormModal visible={addModalOpening} stock_id={stock_id} stock_sku_id={stockSkuIdState} />
        </>
    )
}

export default StockByIdPage
