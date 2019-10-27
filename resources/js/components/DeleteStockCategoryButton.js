import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button, Icon, message, Popconfirm } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { deleteStockCategoryItem, fetchStockCategoriesSuccess } from '~/scripts/redux/actions'

class DeleteStockCategoryButtonContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStockCategoryDeleting: false
        }
    }

    onDeleteHandler = (e) => {
        const {
            object_id,
            deleteStockCategory
        } = this.props
        deleteStockCategory(object_id)
    }

    deleteConfirmationHandler = (e) => {
        const {
            object_id,
            stockCategories,
            putStockCategoryDataToState,
            deleteStockCategory
        } = this.props

        this.setState({
            isStockCategoryDeleting: true
        })

        Axios.delete(`/stock_categories/${object_id}`)
            .then(response => {
                let data = stockCategories.data
                data = data.filter(item => item.object_id != object_id)
                putStockCategoryDataToState(data)
                message.success('ลบหมวดหมู่พัสดุแล้ว')
            })
            .catch(error => {
                ErrorModal(error)
            })
            .finally(() => {
                deleteStockCategory(null)
                this.setState({
                    isStockCategoryDeleting: false
                })
            })
    }

    render() {
        const { object_id } = this.props

        return (
            <Popconfirm placement="left" okType="danger" okText="ลบ" cancelText="ยกเลิก" onConfirm={this.deleteConfirmationHandler} onCancel={null}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                title={<>พัสดุที่อยู่ในหมวดหมู่นี้จะถูกเปลี่ยนไปอยู่ในหมวด &quot;อื่น ๆ&quot;<br />คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้ ?</>}
            >
                <Button type="danger" ghost data-object_id={object_id} loading={this.state.isStockCategoryDeleting} onClick={this.onDeleteHandler}>
                    <Icon type="delete" />
                </Button>
            </Popconfirm>
        )
    }
}

const mapStateToProps = state => ({
    stockCategories: state.stockCategories
})

const mapDispatchToProps = (dispatch) => ({
    deleteStockCategory: (object_id) => dispatch(deleteStockCategoryItem(object_id)),
    putStockCategoryDataToState: (data) => dispatch(fetchStockCategoriesSuccess(data))
})

const DeleteStockCategoryButton = connect(mapStateToProps, mapDispatchToProps)(DeleteStockCategoryButtonContainer)

export default DeleteStockCategoryButton