import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Modal, Input, message, Switch } from 'antd'
import { cancelStockLocationItemEditing, fetchStockLocationsSuccess, openStockLocationFormModal } from '~/scripts/redux/actions'
import Axios from 'axios'

import { ErrorModal } from '~/components'

const { TextArea } = Input;

class StockLocationFormModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            okBtnLoading: false
        }
    }

    onOkHandler = e => {
        const { form, stockLocations, putStockLocationsData, openStockLocationFormModal, stockLocationModifyItem } = this.props
        e.preventDefault()
        form.validateFields(async (err, values) => {
            console.log(values)
            if (!err) {
                this.setState({okBtnLoading: true})

                let { editMode, data} = stockLocationModifyItem
                let url = editMode ? `/stock_locations/${data.object_id}` :   '/stock_locations'
                await Axios({
                    method: editMode ? 'put' : 'post',
                    url: url,
                    data: values
                })
                    .then(response => {
                        let list = stockLocations.data
                        
                        if (editMode) {
                            let index = list.findIndex(item => item.object_id == data.object_id)
                            values.object_id = data.object_id
                            list[index] = values
                            message.success('แก้ไขสถานที่เก็บพัสดุแล้ว')
                        }
                        else {
                            list.push(response.data)
                            message.success('เพิ่มสถานที่เก็บพัสดุแล้ว')
                        }

                        putStockLocationsData(list)
                        openStockLocationFormModal(false)
                        form.resetFields()
                    })
                    .catch((error) => {(
                        ErrorModal(error)
                    )})
            }
            this.setState({okBtnLoading: false})
        });
    }

    onCancelHandler = () => {
        const { form, openStockLocationFormModal, cancelStockLocationEditing } = this.props
        openStockLocationFormModal(false)
        form.resetFields()
        cancelStockLocationEditing()
    }

    render() {
        const { visible, form, stockLocationModifyItem } = this.props
        let { editMode, data } = stockLocationModifyItem
        const { getFieldDecorator } = form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };

        return (
            <Modal title={ editMode ? 'แก้ไขสถานที่เก็บพัสดุ' : 'เพิ่มสถานที่เก็บพัสดุ' } okText={ editMode ? 'แก้ไข' : 'เพิ่ม' } cancelText="ยกเลิก"
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="ชื่อสถานที่">
                        {getFieldDecorator('title', {
                            initialValue: editMode ? data.title : '',
                            rules: [
                                {
                                    required: true,
                                    message: 'โปรดป้อนชื่อสถานที่',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="คำอธิบาย">
                        {getFieldDecorator('description', {
                            initialValue: editMode ? data.description : '',
                        })(<TextArea row={3} />)}
                    </Form.Item>
                    {
                        stockLocationModifyItem.editMode
                        ? (
                            <Form.Item label="แสดงเป็นสาธารณะ">
                                {getFieldDecorator('is_visible', {
                                    initialValue: data.is_visible,
                                    valuePropName: 'checked'
                                })(<Switch />)}
                            </Form.Item>
                        )
                        : null
                    }
                </Form>
            </Modal>
        )
    } 
}

const StockLocationFormFormModalWrappper = Form.create({name: 'frm-stock_location-info'})(StockLocationFormModalContainer)

const mapStateToProps = state => ({
    isStockLocationAddingModalConfirmLoading: state.cpanelStockLocationModalConfirmLoading,
    stockLocations: state.stockLocations,
    stockLocationModifyItem: state.stockLocationModifyItem
})

const mapDispatchToProps = dispatch => ({
    openStockLocationFormModal: isOpen => dispatch(openStockLocationFormModal(isOpen)),
    putStockLocationsData: data => dispatch(fetchStockLocationsSuccess(data)),
    cancelStockLocationEditing: () => dispatch(cancelStockLocationItemEditing())
})

const StockLocationFormModal = connect(mapStateToProps, mapDispatchToProps)(StockLocationFormFormModalWrappper)

export default StockLocationFormModal;