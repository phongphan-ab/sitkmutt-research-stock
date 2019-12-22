import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        if (fileList.length + this.state.pictureFileList.length > 9) {
            Modal.error({
                title: 'เกินจำนวนที่จำกัดไว้แล้ว',
                content: <p>
                    จำนวนไฟล์ที่คุณเพิ่งเลือกกับไฟล์ที่เลือกก่อนหน้าเกินจำนวนสูงสุดที่สามารถอัปโหลดได้แล้ว
                </p>,
                okText: 'ตกลง'
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
            <Modal title={ editMode ? 'แก้ไขพัสดุ' : 'เพิ่มพัสดุ' } okText={ editMode ? 'แก้ไข' : 'เพิ่ม' } cancelText="ยกเลิก"
                visible={visible}
                onOk={this.onOkHandler}
                onCancel={this.onCancelHandler}
                confirmLoading={this.state.okBtnLoading}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="ชื่อพัสดุ">
                        {getFieldDecorator('title', {
                            initialValue: editMode ? data.title : '',
                            rules: [
                                {
                                    required: true,
                                    message: 'โปรดป้อนชื่อพัสดุ',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="หมวดหมู่">
                        {getFieldDecorator('category_id', {
                            initialValue: editMode ? data.description : '',
                            rules: [
                                {
                                    required: true,
                                    message: 'โปรดเลือกหมวดหมู่ของพัสดุนี้',
                                },
                            ]
                        })(
                            <Select showSearch placeholder="โปรดเลือก..." filterOption={this.searchFilterAlgorithm}>
                                {this.state.stockCategoryOptions}
                                <Option key="null" value="null">อื่น ๆ</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="คำอธิบาย">
                        {getFieldDecorator('description', {
                            initialValue: editMode ? data.description : '',
                        })(<TextArea row={3} />)}
                    </Form.Item>
                    <Form.Item label="รูปภาพพัสดุ">
                        {getFieldDecorator('picture', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="files" listType="picture" beforeUpload={this.beforeUpload} onRemove={this.pictureUploadRemovingHandler}>
                                {
                                    this.state.pictureFileList.length >= 9
                                        ? null
                                        : (<Button>เรียกดู</Button> )
                                }                                
                            </Upload>
                        )}
                    </Form.Item>
                    {
                        editMode
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

const CpanelStocksFormModalFormWrappper = Form.create({name: 'frm-stock_category-info'})(CpanelStocksFormModalContainer)

const mapStateToProps = state => ({
    stockCategories: state.stockCategories,
    stockModifyingItem: state.cpanelStockModifyingItem
})

const mapDispatchToProps = dispatch => ({
    cancelStockEditing: () => dispatch(cancelStockItemEditing()),
    openCpanelStocksFormModal: isOpen => dispatch(openCpanelStocksFormModal(isOpen)),
})

const CpanelStocksFormModal = connect(mapStateToProps, mapDispatchToProps)(CpanelStocksFormModalFormWrappper)

export default CpanelStocksFormModal;