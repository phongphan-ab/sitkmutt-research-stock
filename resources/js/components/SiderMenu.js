import React from 'react';
import { Link } from 'react-router-dom'
import { Icon, Menu } from 'antd';

const { SubMenu } = Menu

const SiderMenu = () => (
    <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
        <SubMenu key="stock_categories" title={
            <span>
                <Icon type="search" />
                <span>แค็ตตาล็อกพัสดุ</span>
            </span>
        }>
        </SubMenu>
        <SubMenu key="cpanel" title={
            <span>
                <Icon type="control" />
                <span>แผงควบคุม</span>
            </span>
        }>
            <Menu.Item key="cpanel.users"><Icon type="user" /><span>ผู้ใช้</span></Menu.Item>
            <Menu.Item key="cpanel.stocks"><Icon type="container" /><span>พัสดุ</span></Menu.Item>
            <Menu.Item key="cpanel.stock_categories"><Link to="/cpanel/stock_categories"><Icon type="appstore" /><span>ประเภทพัสดุ</span></Link></Menu.Item>
            <Menu.Item key="cpanel.stock_locations"><Icon type="bank" /><span>สถานที่เก็บพัสดุ</span></Menu.Item>
            <Menu.Item key="cpanel.stock_borrowing_manager"><Icon type="book" /><span>การยืมและการคืนพัสดุ</span></Menu.Item>
            <Menu.Item key="cpanel.reports"><Icon type="file-text" /><span>รายงาน</span></Menu.Item>
        </SubMenu>
    </Menu>
)

export default SiderMenu