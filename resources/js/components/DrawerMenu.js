import React from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'antd'

import { antdDrawerMenuToggle } from '~/scripts/redux/actions'
import { SiderMenu } from './'

const onClose = () => {
    return antdDrawerMenuToggle()
}

const DrawerMenuWithRedux = ({siderCollapsed, dispatch}) => (
    <Drawer title="เมนู" placement="left" visible={siderCollapsed} closable={true} onClose={()=> dispatch(onClose())}>
        <SiderMenu />
    </Drawer>
)

const mapStateToProps = state => ({
    siderCollapsed: state.antdDrawerMenu || false
})

const DrawerMenu = connect(mapStateToProps)(DrawerMenuWithRedux)

export default DrawerMenu