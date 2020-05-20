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
            title: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.title'),
            content: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.description', {stock_name: stock_sku_id}),
            okText: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.buttons.ok'),
            okType: 'danger',
            cancelText: t('pages.cpanel_stocks.content.table.body.actions.dropdown.delete.alert.buttons.cancel'),
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
            title: "ID",
            dataIndex: "object_id"
        },
        {
            key: "code",
            title: "รหัสครุภัณฑ์",
            dataIndex: "code"
        },
        {
            title: "หมายเลขซีเรียล",
            key: "serial_no",
            dataIndex: "serial_no"
        },
        {
            title: "สถานที่เก็บพัสดุ",
            key: "location",
            render: data => <>{data.location.title}</>
        },
        {
            title: "การถูกจำหน่าย",
            key: "is_discarded",
            render: data => data.discarded_at ? (<>ใช่</>) : (<>ยังไม่ถูกจำหน่าย</>)
        },
        {
            title: "ตัวเลือก",
            render: data => {
                let menu = (
                    <Menu>
                        <Menu.Item onClick={e => onClickEditHandler(data.object_id)}>
                            <a><Icon type="edit" /> แก้ไข</a>
                        </Menu.Item>
                        <Menu.Item onClick={e => onClickDeleteHandler(data.object_id)}>
                            <a><Text type="danger"><Icon type="delete" /> ลบ</Text></a>
                        </Menu.Item>
                    </Menu>
                )

                return (<>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a><Icon type="more" /> ตัวเลือก</a>
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
                    title={`รายละเอียดพัสดุ`}
                    subtitle={materialDataState.data?.object_id}
                    descriptionItems={[
                        <Descriptions.Item key="title" label="ชื่อ">{materialDataState.data?.title}</Descriptions.Item>,
                        <Descriptions.Item key="category" label="ประเภท">{materialDataState.data?.category.title}</Descriptions.Item>,
                        <Descriptions.Item key="is_visible" label="แสดงเป็นสาธารณะ">{materialDataState.data?.is_visible ? "ใช่" : "ไม่ใช่"}</Descriptions.Item>,
                        <Descriptions.Item key="created_at" label="วันที่สร้าง">{Moment(materialDataState.data?.created_at).locale('th').format('D MMM YYYY HH:mm:ss')}</Descriptions.Item>,
                        <Descriptions.Item key="updated_at" label="วันที่แก้ไขล่าสุด">{Moment(materialDataState.data?.updated_at).locale('th').format('D MMM YYYY HH:mm:ss')}</Descriptions.Item>
                    ]}
                    operationBtn={[
                        <Button key="addButton" type="primary" onClick={(e) => onAddButtonClickHandler()}>เพิ่ม</Button>
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
