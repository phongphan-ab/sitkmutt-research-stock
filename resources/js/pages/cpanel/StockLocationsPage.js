import React, { Component } from 'react'
import { Button, Empty, Icon, List, Result, Spin, Tooltip } from 'antd'
import { connect }  from 'react-redux'

import { DeleteStockLocationButton, EditStockLocationButton, StockLocationFormModal } from '~/components'
import DefaultLayout from '~/layouts'
import { fetchStockLocations, openStockLocationFormModal } from '~/scripts/redux/actions'

class StockLocationsPageContainer extends Component {   

    componentDidMount() {
        this.props.dispatch(fetchStockLocations())
    }

    render() {
        const { stockLocations, isStockLocationsFormModalOpen, dispatch } = this.props

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
                                    title={<>{item.title}{!item.is_visible ? (<Tooltip title="ถูกซ่อนไว้">&nbsp;<Icon type="disconnect" /></Tooltip>) : ''}</>}
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
                    title="พบข้อผิดพลาด"
                    subTitle={(
                        <>
                            เกิดข้อผิดพลาดขณะโหลดข้อมูล โปรดรีเฟรชหน้านี้ หรือลองอีกครั้งในภายหลัง<br />
                            <small>(รหัสข้อผิดพลาด: {stockCategories.error.response.status})</small>
                        </>
                    )}
                />
            )
        }
        else {
            content = (<Empty description="ยังไม่มีสถานที่เก็บพัสดุ กด &quot;เพิ่ม&quot; เพื่อเพิ่มสถานที่เก็บพัสดุ"/>)
        }

        return (
            <DefaultLayout title="สถานที่เก็บพัสดุ"
                operationBtn={
                    <Button type="primary" onClick={() => dispatch(openStockLocationFormModal(true))}>เพิ่ม</Button>
                }
            >
                <Spin tip="กำลังโหลด..." spinning={stockLocations.loading}>
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

const StockLocationsPage = connect(mapStateToProps)(StockLocationsPageContainer)

export default StockLocationsPage