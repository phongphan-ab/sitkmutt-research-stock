import React from 'react'
import { Modal } from 'antd'

const ErrorModal = (error, description) => (
    Modal.error({
        title: 'พบข้อผิดพลาด',
        content: <>
            <p>{description || 'เกิดข้อผิดพลาดขณะส่งข้อมูลไปยังเซิร์ฟเวอร์ โปรดลองอีกครั้งในภายหลัง'}</p>
            <p><small>(รหัสข้อผิดพลาด: {`HTTP ${error.response.status}`})</small></p>
        </>,
        okText: 'ตกลง'
    })
)

export default ErrorModal