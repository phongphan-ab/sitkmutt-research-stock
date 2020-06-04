import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
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
            t,
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
                message.success(t('pages.cpanel_stocklocations.content.list.buttons.delete.toast_success'))
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
        const { t, object_id, disabled } = this.props

        const DeleteButton = (
            <Button type="danger" icon="delete" ghost data-object_id={object_id} loading={this.state.isStockLocationsDeleting} onClick={this.onDeleteHandler} disabled={disabled} />
        )

        let ButtonWrapper = DeleteButton

        if (disabled) {
            ButtonWrapper = (
                <Tooltip title={t('pages.cpanel_stocklocations.content.list.buttons.delete.tooltip.system_default')} placement="topRight">
                    {DeleteButton}
                </Tooltip>
            )
        }

        return (
            <Popconfirm
                placement="left"
                okType="danger"
                okText={t('pages.cpanel_stocklocations.content.list.buttons.delete.popconfirm.buttons.ok')}
                cancelText={t('pages.cpanel_stocklocations.content.list.buttons.delete.popconfirm.buttons.cancel')}
                disabled={disabled} onConfirm={this.deleteConfirmationHandler}
                onCancel={null}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                title={<div dangerouslySetInnerHTML={{__html: t('pages.cpanel_stocklocations.content.list.buttons.delete.popconfirm.description')}}></div>}
            >
                {ButtonWrapper}
            </Popconfirm>
        )
    }
}

const mapStateToProps = state => ({
    stockLocations: state.stockLocations
})

const mapDispatchToProps = (dispatch) => ({
    deleteStockLocations: (data) => dispatch(deleteStockLocationItem(data)),
    putStockLocationsDataToState: (data) => dispatch(fetchStockLocationsSuccess(data)),
})

const DeleteStockLocationsButtonWithTranslation = withTranslation()(DeleteStockLocationButtonContainer)
const DeleteStockLocationsButton = connect(mapStateToProps, mapDispatchToProps)(DeleteStockLocationsButtonWithTranslation)

export default DeleteStockLocationsButton
