import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'antd'
import Axios from 'axios'

import { ErrorModal } from '~/components'
import { editStockLocationItem, openStockLocationFormModal } from '~/scripts/redux/actions'

class EditStockLocationButtonContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    onClickHandler = (e) => {
        const { object_id, editStockLocation, openStockLocationForm } = this.props;

        this.setState({
            isLoading: true
        })

        Axios.get(`/stock_locations/${object_id}`)
            .then(async response => {
                await editStockLocation(response.data)
                openStockLocationForm(true)
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
    editStockLocation: data => dispatch(editStockLocationItem(data)),
    openStockLocationForm: isOpen => dispatch(openStockLocationFormModal(isOpen))
})

const EditStockLocationButton = connect(null, mapDispatchToProps)(EditStockLocationButtonContainer)

export default EditStockLocationButton

