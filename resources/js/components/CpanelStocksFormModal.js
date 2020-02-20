import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Button, Form, Icon, Input, Modal, message, Select, Switch, Upload } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { cancelStockItemEditing, fetchStockCategoriesSuccess, openCpanelStocksFormModal, fetchStockCategories } from '~/scripts/redux/actions'

const { TextArea } = Input;

class CpanelStocksFormModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            okBtnLoading: false,
            pictureFileList: [],
            stockCategoryOptions: []
        }
    }

    async componentDidMount() {
        await this.props.fetchStockCategories()
        this.setState({
            stockCategoryOptions: this.mapStockCategoriesToOption(this.props.stockCategories.data)
        })
    }

    onOkHandler = e => {
        const { t, form, stocks, putStockCategoriesData, openCpanelStocksFormModal, stockModifyingItem } = this.props
        e.preventDefault()
        form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({okBtnLoading: true})

                let {editMode, data} = stockModifyingItem
                let formData = new FormData();

                if (editMode) {
                    formData.append('_method', 'PUT')
                }
                formData.append('title', values.title)
                formData.append('category_id', values.category_id)
                formData.append('description', values.description)

                if (values.pictures) {
                    values.pictures.map((item, idx) => {
                        let file = item
                        formData.append(`pictures[${idx}]`, file.originFileObj)
                    })
                }
                else {
                    formData.append(`picture[]`, null);
                }

                let url = editMode ? `/stocks/${data.data.object_id}` :   '/stocks'
                await Axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
        //                 let list = stockCategories.data

                        if (editMode) {
        //                     let index = list.findIndex(item => item.object_id == data.object_id)
        //                     values.object_id = data.object_id
        //                     list[index] = values
                            message.success(t('modals.stock.toast.success', {context: 'edit'}))
                        }
                        else {
        //                     list.push(response.data)
                            message.success(t('modals.stock.toast.success', {context: 'add'}))
                        }

        //                 putStockCategoriesData(list)
                        openCpanelStocksFormModal(false)
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
        const { form, openCpanelStocksFormModal, cancelStockEditing } = this.props
        openCpanelStocksFormModal(false)
        form.resetFields()
        cancelStockEditing()
    }

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    beforeUpload = (file, fileList) => {
        const { t } = this.props
        if (fileList.length + this.state.pictureFileList.length > 9) {
            Modal.error({
                title: t('modal.alert.picture_amount_exceeded.title'),
                content: <p>
                    {t('modal.alert.picture_amount_exceeded.description')}
                </p>,
                okText: t('modal.alert.picture_amount_exceeded.ok_text')
            })
        }
        else {
            this.setState(state => ({
                pictureFileList: [...state.pictureFileList, file],
            }));
        }
        return false;
    }

    pictureUploadRemovingHandler = file => {
        this.setState(state => {
            const index = state.pictureFileList.indexOf(file);
            const newFileList = state.pictureFileList.slice();
            newFileList.splice(index, 1);
            return {
                pictureFileList: newFileList,
            };
        });
    }

    searchFilterAlgorithm = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

    mapStockCategoriesToOption(data) {
        return data.map(item => <Select.Option key={item.object_id} value={item.object_id}>{item.title}</Select.Option>)
    }

    render() {
        let { t, visible, form, stockModifyingItem } = this.props
        let { editMode, data } = stockModifyingItem
        const { getFieldDecorator } = form
        const { Option } = Select

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

        let fileList = editMode
            ? data.data.pictures.map(item => ({
                uid: item.object_id,
                status: 'done',
                url: item.url
            }))
            : []

        return (
            <Modal
                title={t('modals.stock.title', {context: editMode ? 'edit' : 'add'})}
                okText={t('modals.stock.button.ok', {context: editMode ? 'edit' : 'add'})}
                cancelText={t('modals.stock.button.cancel')}
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form {...formItemLayout}>
                    <Form.Item label={t('modals.stock.form.title.label')}>
                        {getFieldDecorator('title', {
                            initialValue: editMode ? data.data.title : '',
                            rules: [
                                {
                                    required: true,
                                    message: t('modals.stock.form.title.validation.required'),
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label={t('modals.stock.form.category.label')}>
                        {getFieldDecorator('category_id', {
                            initialValue: editMode ? data.data.category.object_id : '',
                            rules: [
                                {
                                    required: true,
                                    message: t('modals.stock.form.category.validation.required'),
                                },
                            ]
                        })(
                            <Select showSearch placeholder={t('modals.stock.form.category.placeholder')} filterOption={this.searchFilterAlgorithm}>
                                {this.state.stockCategoryOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={t('modals.stock.form.description.label')}>
                        {getFieldDecorator('description', {
                            initialValue: editMode ? data.data.description : '',
                        })(<TextArea row={3} />)}
                    </Form.Item>
                    <Form.Item label={t('modals.stock.form.pictures.label')} extra={t('modals.stock.form.pictures.description')}>
                        {getFieldDecorator('pictures', {
                            initialValue: fileList,
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload accept="image/jpeg, image/gif, image/png, image/bmp" listType="picture" beforeUpload={this.beforeUpload} onRemove={this.pictureUploadRemovingHandler}>
                                {
                                    this.state.pictureFileList.length >= 9
                                        ? null
                                        : (<Button><Icon type="upload" /> {t('modals.stock.form.pictures.button.select')}</Button> )
                                }
                            </Upload>
                        )}
                    </Form.Item>
                    {
                        editMode
                        ? (
                            <Form.Item label={t('modals.stock.form.is_visible.label')}>
                                {getFieldDecorator('is_visible', {
                                    initialValue: data.data.is_visible,
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

const CpanelStocksFormModalFormWrappper = Form.create({name: 'frm-stock-info'})(CpanelStocksFormModalContainer)

const mapStateToProps = state => ({
    isStockCategoryAddingModalConfirmLoading: state.cpanelStockCategoryModalConfirmLoading,
    stockCategories: state.stockCategories,
    stocks: state.stocks,
    stockModifyingItem: state.cpanelStockModifyingItem
})

const mapDispatchToProps = dispatch => ({
    cpanelStocksFormModal: isOpen => dispatch(openCpanelStocksFormModal(isOpen)),
    cancelStockEditing: () => dispatch(cancelStockItemEditing()),
    fetchStockCategories: () => dispatch(fetchStockCategories()),
    openCpanelStocksFormModal: isOpen => dispatch(openCpanelStocksFormModal(isOpen)),
})

const CpanelStocksFormModalTranslation = withTranslation()(CpanelStocksFormModalFormWrappper)
const CpanelStocksFormModal = connect(mapStateToProps, mapDispatchToProps)(CpanelStocksFormModalTranslation)

export default CpanelStocksFormModal;
