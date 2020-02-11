import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar, List, Modal } from 'antd'
import styled from 'styled-components'
import iso6391 from 'iso-639-1'

import i18next from '~/scripts/i18next'
import { openLanguageChangeModal } from '~/scripts/redux/actions'

class LanguageChangeModalPureComponent extends Component {

    constructor(props) {
        super(props)
    }

    changeLanguageOnClickHandler = language => {
        const { dispatch } = this.props
        i18next.changeLanguage(language)
        dispatch(openLanguageChangeModal(false))
    }

    render() {
        let { isLanguageChangeModalOpen, dispatch } = this.props
        const LanguageListItem = styled(List.Item)`
            border-radius: 4px;
            padding: 4px !important;
            background: ${ props => props.selected ? `rgba(201, 219, 238, .5)` : `rgba(201, 219, 238, 0)` };
            transition: background linear .1875s;

            &:hover {
                background: rgba(201, 219, 238, 1);
                cursor: pointer;
            }
        `

        return (
            <Modal
                title="Select Language"
                visible={isLanguageChangeModalOpen}
                centered
                width="100%"
                style={{ width: '100%', maxWidth: '900px' }}
                footer={null}
                onCancel={() => dispatch(openLanguageChangeModal(false))}
            >
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
                    dataSource={Object.keys(i18next.store.data)}
                    renderItem={item => (
                        <LanguageListItem selected={i18next.language == item} onClick={(e) => this.changeLanguageOnClickHandler(item)}>
                            <Avatar style={{background: '#8bb1da'}}>{item.toUpperCase()}</Avatar> {iso6391.getNativeName(item)}
                        </LanguageListItem>
                    )}
                />
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    isLanguageChangeModalOpen: state.languageChangeModal
})

const LanguageChangeModal = connect(mapStateToProps)(LanguageChangeModalPureComponent)

export default LanguageChangeModal
