import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Modal, Input, message, Switch } from 'antd'
import { cancelStockCategoryItemEditing, fetchStockCategoriesSuccess, openStockCategoryModalForm } from '~/scripts/redux/actions'
import Axios from 'axios'

import { ErrorModal } from '~/components'

const { TextArea } = Input;

class StockCategoryFormModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            okBtnLoading: false
        }
    }

    onOkHandler = e => {
        const { form, stockCategories, putStockCategoriesData, openStockCategoryModalForm, stockCategoriesModifyItem } = this.props
        e.preventDefault()
        form.validateFields(async (err, values) => {
            console.log(values)
            if (!err) {
                this.setState({okBtnLoading: true})

                let { editMode, data} = stockCategoriesModifyItem
                let url = editMode ? `/stock_categories/${data.object_id}` :   '/stock_categories'
                await Axios({
                    method: editMode ? 'put' : 'post',
                    url: url,
                    data: values
                })
                    .then(response => {
                        let list = stockCategories.data
                        
                        if (editMode) {
                            let index = list.findIndex(item => item.object_id == data.object_id)
                            values.object_id = data.object_id
                            list[index] = values
                            message.success('แก้ไขหมวดหมู่พัสดุแล้ว')
                        }
                        else {
                            list.push(response.data)
                            message.success('เพิ่มหมวดหมู่พัสดุแล้ว')
                        }

                        putStockCategoriesData(list)
                        openStockCategoryModalForm(false)
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
        const { form, openStockCategoryModalForm, cancelStockCategoryEditing } = this.props
        openStockCategoryModalForm(false)
        form.resetFields()
        cancelStockCategoryEditing()
    }

    render() {
        const { visible, form, stockCategoriesModifyItem } = this.props
        let { editMode, data } = stockCategoriesModifyItem
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
            <Modal title={ editMode ? 'แก้ไขประเภทพัสดุ' : 'เพิ่มประเภทพัสดุ' } okText={ editMode ? 'แก้ไข' : 'เพิ่ม' } cancelText="ยกเลิก"
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="ชื่อประเภท">
                        {getFieldDecorator('title', {
                            initialValue: editMode ? data.title : '',
                            rules: [
                                {
                                    required: true,
                                    message: 'โปรดป้อนชื่อประเภทพัสดุ',
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
                        stockCategoriesModifyItem.editMode
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

const StockCategoryFormModalFormWrappper = Form.create({name: 'frm-stock_category-info'})(StockCategoryFormModalContainer)

const mapStateToProps = state => ({
    isStockCategoryAddingModalConfirmLoading: state.cpanelStockCategoryModalConfirmLoading,
    stockCategories: state.stockCategories,
    stockCategoriesModifyItem: state.stockCategoriesModifyItem
})

const mapDispatchToProps = dispatch => ({
    openStockCategoryModalForm: isOpen => dispatch(openStockCategoryModalForm(isOpen)),
    putStockCategoriesData: data => dispatch(fetchStockCategoriesSuccess(data)),
    cancelStockCategoryEditing: () => dispatch(cancelStockCategoryItemEditing())
})

const StockCategoryFormModal = connect(mapStateToProps, mapDispatchToProps)(StockCategoryFormModalFormWrappper)

export default StockCategoryFormModal;