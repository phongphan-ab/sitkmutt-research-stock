import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon, Menu } from 'antd'

const { SubMenu } = Menu

const SiderMenu = () => {
    const { t } = useTranslation()

    return (
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <SubMenu key="stock_categories" title={
                <span>
                    <Icon type="search" />
                    <span>{t('sider.menus.stock_categories')}</span>
                </span>
            }>
            </SubMenu>
            <SubMenu key="cpanel" title={
                <span>
                    <Icon type="control" />
                    <span>{t('sider.menus.control_panel')}</span>
                </span>
            }>
                <Menu.Item key="cpanel.users" disabled><Icon type="user" /><span>{t('sider.menus.control_panels.users')}</span></Menu.Item>
                <Menu.Item key="cpanel.stocks"><Link to="/cpanel/stocks"><Icon type="container" /><span>{t('sider.menus.control_panels.stocks')}</span></Link></Menu.Item>
                <Menu.Item key="cpanel.stock_categories"><Link to="/cpanel/stock_categories"><Icon type="appstore" /><span>{t('sider.menus.control_panels.stock_categories')}</span></Link></Menu.Item>
                <Menu.Item key="cpanel.stock_locations"><Link to="/cpanel/stock_locations"><Icon type="bank" /><span>{t('sider.menus.control_panels.stock_locations')}</span></Link></Menu.Item>
                <Menu.Item key="cpanel.requests" disabled><Icon type="book" /><span>{t('sider.menus.control_panels.requests')}</span></Menu.Item>
                <Menu.Item key="cpanel.reports" disabled><Icon type="file-text" /><span>{t('sider.menus.control_panels.reports')}</span></Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default SiderMenu
