import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { Button, Empty, Icon, List, Result, Spin, Tooltip } from 'antd'
import Axios from 'axios'

import { CpanelStocksFormModal, ErrorModal } from '~/components'
import DefaultLayout from '~/layouts'
import { fetchCpanelStocks, openCpanelStocksFormModal } from '~/scripts/redux/actions'

class StocksPageContainer extends Component {   

    constructor(props) {
        super(props)
        this.state = {
            addButtonLoading: false,
            stockCategoryData: []
        }
    }

    addStockButtonHandler = () => {
        const { openCpanelStocksFormModal } = this.props
        openCpanelStocksFormModal(true)
    }

    render() {
        const { stocks, isCpanelStocksFormModalOpen } = this.props

        let content
        if (stocks.data && stocks.data.length > 0 && !stocks.error) {
            content = (
                <span></span>
            )
        }
        else if (stocks.error) {
            content = (
                <Result
                    status="error"
                    title="พบข้อผิดพลาด"
                    subTitle={(
                        <>
                            เกิดข้อผิดพลาดขณะโหลดข้อมูล โปรดรีเฟรชหน้านี้ หรือลองอีกครั้งในภายหลัง<br />
                            {<small>(รหัสข้อผิดพลาด: {stocks.error.response.status})</small>}
                        </>
                    )}
                />
            )
        }
        else {
            content = (<Empty description="ยังไม่มีพัสดุ กด &quot;เพิ่ม&quot; เพื่อเพิ่มพัสดุ" />)
        }

        return (
            <DefaultLayout title="พัสดุ"
                operationBtn={
                    <Button type="primary" loading={this.state.addButtonLoading} onClick={this.addStockButtonHandler}>เพิ่ม</Button>
                }
            >
                <Spin tip="กำลังโหลด..." spinning={stocks.loading}>
                    {content}
                </Spin>
                <CpanelStocksFormModal visible={isCpanelStocksFormModalOpen} stockCategory={this.props.stockCategories}/>
            </DefaultLayout>
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.cpanelStocks,
    isCpanelStocksFormModalOpen: state.cpanelStocksFormModal,
    stockCategories: state.stockCategories
})

const mapDispatchToProps = dispatch => ({
    fetchStockCategories: () => dispatch(fetchStockCategories()),
    openCpanelStocksFormModal: isOpen => dispatch(openCpanelStocksFormModal(isOpen))
})

const StocksPage = connect(mapStateToProps, mapDispatchToProps)(StocksPageContainer)

export default StocksPage