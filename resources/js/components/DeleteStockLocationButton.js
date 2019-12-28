import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button, Icon, message, Popconfirm, Tooltip } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { deleteStockLocationItem, fetchStockLocationsSuccess } from '~/scripts/redux/actions'

class DeleteStockLocationButtonContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStockLocationsDeleting: false
        }
    }

    onDeleteHandler = (e) => {
        const {
            object_id,
            deleteStockLocations
        } = this.props
        deleteStockLocations({object_id: object_id})
    }

    deleteConfirmationHandler = (e) => {
        const {
            object_id,
            stockLocations,
            putStockLocationsDataToState,
            deleteStockLocations
        } = this.props

        this.setState({
            isStockLocationsDeleting: true
        })

        Axios.delete(`/stock_locations/${object_id}`)
            .then(response => {
                let data = stockLocations.data
                data = data.filter(item => item.object_id != object_id)
                putStockLocationsDataToState(data)
                message.success('ลบสถานที่เก็บพัสดุแล้ว')
            })
            .catch(error => {
                ErrorModal(error)
            })
            .finally(() => {
                deleteStockLocations(null)
                this.setState({
                    isStockLocationsDeleting: false
                })
            })
    }

    render() {
        const { object_id, disabled } = this.props

        const DeleteButton = (
            <Button type="danger" icon="delete" ghost data-object_id={object_id} loading={this.state.isStockLocationsDeleting} onClick={this.onDeleteHandler} disabled={disabled} />
        )

        let ButtonWrapper = DeleteButton

        if (disabled) {
            ButtonWrapper = (
                <Tooltip title="เป็นค่าเริ่มต้นของระบบ ไม่สามารถลบได้" placement="topRight">
                    {DeleteButton}
                </Tooltip>
            )
        }

        return (
            <Popconfirm placement="left" okType="danger" okText="ลบ" cancelText="ยกเลิก" disabled={disabled} onConfirm={this.deleteConfirmationHandler} onCancel={null}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                title={<>พัสดุที่อยู่ในสถานที่นี้จะถูกเปลี่ยนเป็นสถานที่ &quot;อื่น ๆ&quot;<br />คุณแน่ใจหรือไม่ที่จะลบสถานที่นี้ ?</>}
            >
                {ButtonWrapper}
            </Popconfirm>
        )
    }
}

const mapStateToProps = state => ({
    stockLocations: state.stockLocations,
    
})

const mapDispatchToProps = (dispatch) => ({
    deleteStockLocations: (data) => dispatch(deleteStockLocationItem(data)),
    putStockLocationsDataToState: (data) => dispatch(fetchStockLocationsSuccess(data)),
})

const DeleteStockLocationsButton = connect(mapStateToProps, mapDispatchToProps)(DeleteStockLocationButtonContainer)

export default DeleteStockLocationsButton