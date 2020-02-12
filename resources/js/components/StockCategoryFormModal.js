import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next';
import { Form, Modal, Input, message, Switch } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { cancelStockCategoryItemEditing, fetchStockCategoriesSuccess, openStockCategoryModalForm } from '~/scripts/redux/actions'

const { TextArea } = Input;

class StockCategoryFormModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            okBtnLoading: false,
            editPrevention: false
        }
    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.stockCategoriesModifyItem.data;

        if (data) {
            this.setState({
                editPrevention: data.edit_prevention
            })
        }
    }

    onOkHandler = e => {
        const { t, form, stockCategories, putStockCategoriesData, openStockCategoryModalForm, stockCategoriesModifyItem } = this.props
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
                            list[index] = {...data, ...values}
                            message.success(t('modals.stock_category.title.edit'))
                        }
                        else {
                            list.push(response.data)
                            message.success(t('modals.stock_category.success_text.add'))
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
        this.setState({
            editPrevention: false
        })
    }

    render() {
        const { t, visible, form, stockCategoriesModifyItem } = this.props
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

        const NotForEditPrevention = (
            <>
                <Form.Item label={t('modals.stock_category.form.title')}>
                    {getFieldDecorator('title', {
                        initialValue: editMode ? data.title : '',
                        rules: [
                            {
                                required: true,
                                message: t('modals.stock_category.form.validation.title.required'),
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label={t('modals.stock_category.form.description')}>
                    {getFieldDecorator('description', {
                        initialValue: editMode ? data.description : '',
                    })(<TextArea row={3} />)}
                </Form.Item>
            </>
        )

        return (
            <Modal
                title={ editMode ? t('modals.stock_category.title.edit') : t('modals.stock_category.title.add') }
                okText={ editMode ? t('modals.stock_category.ok_text.edit') : t('modals.stock_category.ok_text.add') }
                cancelText={t('modals.stock_category.cancel_text')}
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form {...formItemLayout}>
                    { this.state.editPrevention ? null : NotForEditPrevention }
                    {
                        stockCategoriesModifyItem.editMode
                        ? (
                            <Form.Item label={t('modals.stock_category.form.visible')}>
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

const StockLocationFormModalTranslation = withTranslation()(StockCategoryFormModalFormWrappper)
const StockCategoryFormModal = connect(mapStateToProps, mapDispatchToProps)(StockLocationFormModalTranslation)

export default StockCategoryFormModal;
