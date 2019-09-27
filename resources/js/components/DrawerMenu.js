import React from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'antd'
import styled from 'styled-components'

import { antdDrawerMenuToggle } from '~/scripts/redux/actions'
import { SiderMenu } from './'

const onClose = () => {
    return antdDrawerMenuToggle()
}

const StyledDrawer = styled(Drawer)`
    & .ant-drawer-body {
        padding: 0;
    }
`

const DrawerMenuWithRedux = ({siderCollapsed, dispatch}) => (
    <StyledDrawer title="เมนู" placement="left" visible={siderCollapsed} closable={true} onClose={()=> dispatch(onClose())}>
        <SiderMenu />
    </StyledDrawer>
)

const mapStateToProps = state => ({
    siderCollapsed: state.antdDrawerMenu || false
})

const DrawerMenu = connect(mapStateToProps)(DrawerMenuWithRedux)

export default DrawerMenu