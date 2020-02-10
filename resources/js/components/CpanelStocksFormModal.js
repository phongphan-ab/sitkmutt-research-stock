import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Button, Form, Icon, Input, Modal, message, Select, Switch, Upload } from 'antd'
import { cancelStockItemEditing, fetchStockCategoriesSuccess, openCpanelStocksFormModal, fetchStockCategories } from '~/scripts/redux/actions'

const { TextArea } = Input;

class CpanelStocksFormModalContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            optionItem: null,
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
                            initialValue: editMode ? data.title : '',
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
                            initialValue: editMode ? data.description : '',
                            rules: [
                                {
                                    required: true,
                                    message: t('modals.stock.form.category.validation.required'),
                                },
                            ]
                        })(
                            <Select showSearch placeholder={t('modals.stock.form.category.placeholder')} filterOption={this.searchFilterAlgorithm}>
                                {this.state.stockCategoryOptions}
                                <Option key="null" value="null">อื่น ๆ</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={t('modals.stock.form.description.label')}>
                        {getFieldDecorator('description', {
                            initialValue: editMode ? data.description : '',
                        })(<TextArea row={3} />)}
                    </Form.Item>
                    <Form.Item label={t('modals.stock.form.pictures.label')} extra={t('modals.stock.form.pictures.description')}>
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="files" listType="picture" beforeUpload={this.beforeUpload} onRemove={this.pictureUploadRemovingHandler}>
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

const CpanelStocksFormModalFormWrappper = Form.create({name: 'frm-stock_category-info'})(CpanelStocksFormModalContainer)

const mapStateToProps = state => ({
    stockCategories: state.stockCategories,
    stockModifyingItem: state.cpanelStockModifyingItem
})

const mapDispatchToProps = dispatch => ({
    cancelStockEditing: () => dispatch(cancelStockItemEditing()),
    fetchStockCategories: () => dispatch(fetchStockCategories()),
    openCpanelStocksFormModal: isOpen => dispatch(openCpanelStocksFormModal(isOpen)),
})

const CpanelStocksFormModalTranslation = withTranslation()(CpanelStocksFormModalFormWrappper)
const CpanelStocksFormModal = connect(mapStateToProps, mapDispatchToProps)(CpanelStocksFormModalTranslation)

export default CpanelStocksFormModal;