import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { editStockCategoryItem, openStockCategoryModalForm } from '~/scripts/redux/actions'

class EditStockCategoryButtonContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    onClickHandler = (e) => {
        const { object_id, editStockCategory, openStockCategoryForm } = this.props;

        this.setState({
            isLoading: true
        })

        Axios.get(`/stock_categories/${object_id}`)
            .then(async response => {
                await editStockCategory(response.data)
                openStockCategoryForm(true)
            })
            .catch(error => {
                ErrorModal(error)
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        const { object_id } = this.props

        return (
            <Button loading={this.state.isLoading} icon="edit" onClick={this.onClickHandler} data-object_id={object_id}>แก้ไข</Button>
        )
    } 
}

const mapDispatchToProps = dispatch => ({
    editStockCategory: data => dispatch(editStockCategoryItem(data)),
    openStockCategoryForm: isOpen => dispatch(openStockCategoryModalForm(isOpen))
})

const EditStockCategoryButton = connect(null, mapDispatchToProps)(EditStockCategoryButtonContainer)

export default EditStockCategoryButton

