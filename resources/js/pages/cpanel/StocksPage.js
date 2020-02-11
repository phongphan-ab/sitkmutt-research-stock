import React, { Component } from 'react'
import { connect }  from 'react-redux'
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
        const { stocks, isCpanelStocksFormModalOpen } = this.props

        let columns = [
            {
                title: 'ID',
                key: 'id',
                ellipsis: true,
                sorter: true,
                width: 304,
                render: (data) => <Link to={`/cpanel/stocks/${data.object_id}`}>{data.object_id}</Link>
            },
            {
                title: 'ชื่อพัสดุ',
                key: 'title',
                render: (data) => <>{data.title} {!data.is_visible ? (<Tooltip title="ถูกซ่อนไว้">&nbsp;<Icon type="disconnect" /></Tooltip>) : null}</>
            },
            {
                title: 'หมวดหมู่',
                key: 'category',
                render: (data) => <>{data.category.title}</>
            },
            {
                title: 'จำนวนทั้งหมด',
                key: 'amount_all',
                width: 100
            },
            {
                title: 'จำนวนที่ถูกยืม',
                key: 'amount_borrowed',
                width: 100
            },
            {
                title: 'จำนวนที่ถูกจำหน่าย',
                key: 'amount_discarded',
                width: 100
            },
            {
                title: 'จำนวนที่คงเหลือ',
                key: 'amount_remaining',
                width: 100
            },
            {
                title: 'การกระทำ',
                width: 96,
                render: (data) => {
                    let deleting = false
                    let deleteConfirm = () => {
                        confirm({
                            title: 'แน่ใจหรือไม่ ?',
                            content: `การดำเนินการนี้จะไม่สามารถเลิกทำได้ คุณแน่ใจหรือไม่ที่จะลบพัสดุ ${data.title} ?`,
                            okText: 'ลบ',
                            okType: 'danger',
                            cancelText: 'ยกเลิก',
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
                                <a><Icon type="edit" /> แก้ไข</a>
                            </Menu.Item>
                            <Menu.Item onClick={deleteConfirm}>
                                <a><Text type="danger"><Icon type="delete" /> ลบ</Text></a>
                            </Menu.Item>
                        </Menu>
                    )

                    return (<>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a><Icon type="more" />ตัวเลือก</a>
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
                    return <Result status="error" title="พบข้อผิดพลาด"
                        subTitle={(
                            <>
                                เกิดข้อผิดพลาดขณะโหลดข้อมูล โปรดรีเฟรชหน้านี้ หรือลองอีกครั้งในภายหลัง<br />
                                {stocks.error.response ? <small>(รหัสข้อผิดพลาด: {stocks.error.response.status})</small> : null}
                            </>
                        )}
                    />
                }
                return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" />
            }
        }

        return (
            <>
                <Spin size="large" spinning={this.state.editModalLoading}>
                    <DefaultLayout title="พัสดุ"
                        operationBtn={
                            <Button type="primary" loading={this.state.addButtonLoading} onClick={this.addStockButtonHandler}>เพิ่ม</Button>
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

const StocksPage = connect(mapStateToProps, mapDispatchToProps)(StocksPageContainer)

export default StocksPage