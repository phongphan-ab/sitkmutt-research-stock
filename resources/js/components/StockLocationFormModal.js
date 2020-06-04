import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Form, Modal, Input, message, Switch } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { cancelStockLocationItemEditing, fetchStockLocationsSuccess, openStockLocationFormModal } from '~/scripts/redux/actions'

const { TextArea } = Input;

class StockLocationFormModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            okBtnLoading: false,
            editPrevention: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        let data = props.stockLocationModifyItem.data;

        if (data) {
            return {
                editPrevention: data.edit_prevention
            }
        }
        return null;
    }

    onOkHandler = e => {
        const { t, form, stockLocations, putStockLocationsData, openStockLocationFormModal, stockLocationModifyItem } = this.props
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
                            list[index] = {...data, ...values}
                            message.success(t('modals.stock_location.title.edit'))
                        }
                        else {
                            list.push(response.data)
                            message.success(t('modals.stock_location.title.add'))
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
        this.setState({
            editPrevention: false
        })
    }

    render() {
        const { t, visible, form, stockLocationModifyItem } = this.props
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

        const NotForEditPrevention = (
            <>
                <Form.Item label={t('modals.stock_location.form.title')}>
                    {getFieldDecorator('title', {
                        initialValue: editMode ? data.title : '',
                        rules: [
                            {
                                required: true,
                                message: t('modals.stock_location.form.validation.title.required'),
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label={t('modals.stock_location.form.description')}>
                    {getFieldDecorator('description', {
                        initialValue: editMode ? data.description : '',
                    })(<TextArea row={3} />)}
                </Form.Item>
            </>
        )

        return (
            <Modal title={ editMode ? t('modals.stock_location.title.edit') : t('modals.stock_location.title.add') } okText={ editMode ? t('modals.stock_location.ok_text.edit') : t('modals.stock_location.ok_text.add') } cancelText={t('modals.stock_location.cancel_text')}
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form {...formItemLayout}>
                    {this.state.editPrevention ? null : NotForEditPrevention}
                    {
                        stockLocationModifyItem.editMode
                        ? (
                            <Form.Item label={t('modals.stock_location.form.visible')}>
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

const StockLocationFormModalTranslation = withTranslation()(StockLocationFormFormModalWrappper)
const StockLocationFormModal = connect(mapStateToProps, mapDispatchToProps)(StockLocationFormModalTranslation)

export default StockLocationFormModal;
