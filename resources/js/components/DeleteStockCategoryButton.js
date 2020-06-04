import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Button, Icon, message, Popconfirm, Tooltip } from 'antd'
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
        deleteStockCategory({object_id: object_id})
    }

    deleteConfirmationHandler = (e) => {
        const {
            t,
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
                message.success(t('pages.cpanel_stockcategories.content.list.buttons.delete.toast_success'))
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
        const { t, object_id, disabled } = this.props

        const DeleteButton = (
            <Button type="danger" icon="delete" ghost data-object_id={object_id} loading={this.state.isStockCategoryDeleting} onClick={this.onDeleteHandler} disabled={disabled} />
        )

        let ButtonWrapper = DeleteButton

        if (disabled) {
            ButtonWrapper = (
                <Tooltip title={t('pages.cpanel_stockcategories.content.list.buttons.delete.tooltip.system_default')} placement="topRight">
                    {DeleteButton}
                </Tooltip>
            )
        }

        return (
            <Popconfirm placement="left" okType="danger"
                okText={t('pages.cpanel_stockcategories.content.list.buttons.delete.popconfirm.buttons.ok')}
                cancelText={t('pages.cpanel_stockcategories.content.list.buttons.delete.popconfirm.buttons.cancel')}
                disabled={disabled}
                onConfirm={this.deleteConfirmationHandler}
                onCancel={null}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                title={<div dangerouslySetInnerHTML={{__html: t('pages.cpanel_stockcategories.content.list.buttons.delete.popconfirm.description')}}></div>}
            >
                {ButtonWrapper}
            </Popconfirm>
        )
    }
}

const mapStateToProps = state => ({
    stockCategories: state.stockCategories
})

const mapDispatchToProps = (dispatch) => ({
    deleteStockCategory: (data) => dispatch(deleteStockCategoryItem(data)),
    putStockCategoryDataToState: (data) => dispatch(fetchStockCategoriesSuccess(data)),
})

const DeleteStockCategoryButtonWithTranslation = withTranslation()(DeleteStockCategoryButtonContainer)
const DeleteStockCategoryButton = connect(mapStateToProps, mapDispatchToProps)(DeleteStockCategoryButtonWithTranslation)

export default DeleteStockCategoryButton
