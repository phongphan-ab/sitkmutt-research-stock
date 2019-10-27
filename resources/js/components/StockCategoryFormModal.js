import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Modal, Input, message, Switch } from 'antd'
import { fetchStockCategoriesSuccess, openStockCategoryAddingModal } from '~/scripts/redux/actions'
import axios from 'axios'

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
        const { form, stockCategories, putStockCategoriesData, openStockCategoryModalForm } = this.props

        e.preventDefault()
        form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({okBtnLoading: true})
                await axios.post('/stock_categories', values)
                    .then(response => {
                        let list = stockCategories.data
                        list.push(response.data)
                        putStockCategoriesData(list)
                        openStockCategoryModalForm(false)
                        form.resetFields()
                        message.success('เพิ่มหมวดหมู่พัสดุแล้ว')
                    })
                    .catch((error) => {(
                        ErrorModal(error)
                    )})
            }

            this.setState({okBtnLoading: false})
        });
    }

    onCancelHandler = async () => {
        const { openStockCategoryModalForm } = this.props
        openStockCategoryModalForm(false)
        form.resetFields()
    }

    render() {
        const { visible, editMode, form } = this.props
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
            <Form {...formItemLayout}>
            <Modal title="เพิ่มประเภทพัสดุ" okText="เพิ่ม" cancelText="ยกเลิก"
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form.Item label="ชื่อประเภท">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: 'โปรดป้อนชื่อประเภทพัสดุ',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="คำอธิบาย">
                    {getFieldDecorator('description')(<TextArea row={3} />)}
                </Form.Item>
                {
                    editMode
                    ? (
                        <Form.Item label="แสดงเป็นสาธารณะ">
                            {getFieldDecorator('is_visible', {valuePropName: 'checked', initialValue: true })(<Switch />)}
                        </Form.Item>
                    )
                    : null
                }
            </Modal>
        </Form>
        )
    } 
}

const StockCategoryFormModalFormWrappper = Form.create({name: 'frm-stock_category-info'})(StockCategoryFormModalContainer)

const mapStateToProps = state => ({
    isStockCategoryAddingModalConfirmLoading: state.cpanelStockCategoryModalConfirmLoading,
    stockCategories: state.stockCategories
})

const mapDispatchToProps = dispatch => ({
    openStockCategoryModalForm: isOpen => dispatch(openStockCategoryAddingModal(isOpen)),
    putStockCategoriesData: data => dispatch(fetchStockCategoriesSuccess(data)),
})

const StockCategoryFormModal = connect(mapStateToProps, mapDispatchToProps)(StockCategoryFormModalFormWrappper)

export default StockCategoryFormModal;