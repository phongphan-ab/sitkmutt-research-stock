import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector }  from 'react-redux'
import { Form, DatePicker, Input, message, Modal, Select } from 'antd'
import Axios from 'axios'
import Moment from 'moment'

import { ErrorModal } from "~/components";
import { openCpanelStockSkuFormModal, fetchStockLocations, fetchCpanelStockSkus } from '~/scripts/redux/actions'

const CpanelStockSkuFormModalContent = ({form, visible, stock_id, stock_sku_id}) => {
    const [ modalLoading, setModalLoading ] = useState(false)
    const [ formDisabled, setFormDisabled] = useState(false)
    const stockLocationData = useSelector(state => state.stockLocations.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStockLocations())
    },[])

    const { getFieldDecorator } = form
    const { TextArea } = Input
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
    const disabledReceivedDate = current => current > Moment().endOf('day')
    const locationSearchFilterAlgorithm = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    const onOkModalHandler = async e => {
        setModalLoading(true)
        e.preventDefault()
        form.validateFields(async (err, values) => {
            if (!err) {
                setFormDisabled(true)
                try {
                    values.received_at = Moment(values.received_at).format("YYYY-MM-DD HH:mm:ss")
                    let response = await Axios.post(`/stocks/${stock_id}/skus`, values)
                    message.success("เพิ่มข้อมูลเรียบร้อยแล้ว")
                    form.resetFields()
                    setFormDisabled(false)
                    setModalLoading(false)
                    dispatch(fetchCpanelStockSkus(stock_id))
                    dispatch(openCpanelStockSkuFormModal(false))
                }
                catch (error) {
                    ErrorModal(error)
                    setFormDisabled(false)
                    console.error(error)
                }
            }
        })
    }
    const onCancelModalHandler = () => {
        form.resetFields()
        dispatch(openCpanelStockSkuFormModal(false))
    }

    return (
        <Modal
            visible={visible}
            title="เพิ่มพัสดุย่อย"
            okText="ตกลง"
            cancelText="ยกเลิก"
            onOk={onOkModalHandler}
            onCancel={onCancelModalHandler}
            okButtonProps={{
                loading: formDisabled
            }}
            cancelButtonProps={{
                disabled: formDisabled
            }}
        >
            <Form {...formItemLayout}>
                <Form.Item label="รหัสครุภัณฑ์" >
                    {getFieldDecorator('code', {
                        rules: [
                            {
                                required: true,
                                message: "โปรดป้อนรหัสครุภัณฑ์",
                            },
                        ],
                    })(<Input disabled={formDisabled}/>)}
                </Form.Item>
                <Form.Item label="หมายเลขซีเรียล">
                    {getFieldDecorator('serial_no', {})(<Input disabled={formDisabled}/>)}
                </Form.Item>
                <Form.Item label="คำอธิบาย">
                    {getFieldDecorator('description', {})(<TextArea row={3} disabled={formDisabled}/>)}
                </Form.Item>
                <Form.Item label="ราคา">
                    {getFieldDecorator('price', {
                        initialValue: 0.00,
                        rules: [
                            {
                                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                                message: "โปรดป้อนราคาพัสดุที่ถูกต้อง",
                            },
                        ],
                    })(<Input addonBefore="฿" disabled={formDisabled}/>)}
                </Form.Item>
                <Form.Item label="สถานที่เก็บพัสดุ">
                    {getFieldDecorator('location_object_id', {
                        rules: [
                            {
                                required: true,
                                message: "โปรดเลือกสถานที่เก็บพัสดุ",
                            },
                        ]
                    })(
                        <Select showSearch placeholder="โปรดเลือก..." disabled={formDisabled} filterOption={locationSearchFilterAlgorithm}>
                            {stockLocationData?.map(item => <Select.Option key={item.object_id} value={item.object_id}>{item.title}</Select.Option>)}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="วันที่ได้รับพัสดุ">
                    {getFieldDecorator('received_at', {
                        rules: [
                            {
                                required: true,
                                message: "โปรดป้อนวันที่ได้รับพัสดุ",
                            },
                        ],
                    })(<DatePicker disabledDate={disabledReceivedDate} disabled={formDisabled}/>)}
                </Form.Item>
                <Form.Item label="เจ้าของพัสดุ">
                    {getFieldDecorator('owner', {})(<Input disabled={formDisabled} />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const CpanelStockSkuFormModal = Form.create({name: 'frm-stock-sku-info'})(CpanelStockSkuFormModalContent)

export default CpanelStockSkuFormModal
