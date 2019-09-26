import React from 'react'
import { Layout, Menu, Input, Icon, Breadcrumb, Typography, Avatar, Dropdown, Badge, Divider } from 'antd'
import styled from 'styled-components'

const { Header, Sider, Content, Footer } = Layout
const { SubMenu } = Menu
const { Text } = Typography

const RightMenuWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding-right: 20px;
    color: rgba(255, 255, 255, 0.5);

    & > * {
        margin-right: 16px;
    }

    & > *:last-child {
        margin-right: 0;
    }
`

const TextCenter = styled.div`
    text-align: center;
`

const userMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
);

const IndexPage = () => (
    <Layout>
        <Header style={{ 
            display: 'flex',
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            padding: 0,
            justifyContent: 'space-between'
        }}>
            <div style={{
                display: 'flex',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '272px'
                }}>
                    <Icon className="trigger" type={true ? 'menu-unfold' : 'menu-fold'} onClick={null} style={{
                        width: '64px',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '24px',
                        color: 'rgba(255, 255, 255, 0.5)'
                    }} />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src="/images/logo-sit.svg" style={{
                            margin: '16px 0px',
                            height: '32px'
                        }} />
                        <span style={{ color: '#ffffff', fontSize: '16px', lineHeight: '1em' }}>Research<br />Stock</span>
                    </div>
                </div>
                <div style={{
                    width: '100%',
                    maxWidth: '640px',
                    padding: '0 16px'
                }}>
                    <NavbarSearchBox placeholder="ค้นหาพัสดุที่นี่" style={{
                        width: '100%',
                        maxWidth: '640px',
                        height: '48px',
                    }} />
                </div> 
            </div>
            <RightMenuWrapper>
                <Badge count={5}>
                    <Icon type="shopping-cart" style={{ fontSize: '24px' }} />
                </Badge>
                <Divider type="vertical" />
                <Badge count={5}>
                    <Icon type="bell" style={{ fontSize: '24px' }} />
                </Badge>
                <Dropdown overlay={userMenu}>
                    <a href="#">
                        <Avatar style={{ color: '#316195', backgroundColor: '#8bb1da' }}>U</Avatar>
                        <Text style={{ marginLeft: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>ชื่อจริง</Text>
                    </a>
                </Dropdown>
            </RightMenuWrapper>
        </Header>
        <Layout style={{
            marginTop: '64px'
        }}>
            <Sider width={272} trigger={null} collapsible collapsed={false} style={{
                background: '#fff',
                overflowX: 'hidden',
                overflowY: 'auto',
                height: 'calc(100vh - 64px)',
                position: 'fixed',
                left: 0,
            }}>
                <Menu mode="inline" defaultOpenKeys={['stock_categories']} style={{ height: '100%', borderRight: 0 }} >
                    <SubMenu key="stock_categories" title={
                        <span>
                            <Icon type="search" />
                            เรียกดูพัสดุตามหมวดหมู่
                        </span>
                    }>
                    </SubMenu>
                    <SubMenu key="cpanel" title={
                        <span>
                            <Icon type="control" />
                            แผงควบคุม
                        </span>
                    }>
                        <Menu.Item key="cpanel.users"><Icon type="user" />ผู้ใช้</Menu.Item>
                        <Menu.Item key="cpanel.stocks"><Icon type="container" />พัสดุ</Menu.Item>
                        <Menu.Item key="cpanel.stock_categories"><Icon type="appstore" />ประเภทพัสดุ</Menu.Item>
                        <Menu.Item key="cpanel.stock_locations"><Icon type="bank" />สถานที่เก็บพัสดุ</Menu.Item>
                        <Menu.Item key="cpanel.stock_borrowing_manager"><Icon type="book" />การยืมและการคืนพัสดุ</Menu.Item>
                        <Menu.Item key="cpanel.reports"><Icon type="file-text" />รายงาน</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 272 }}>
                <Content style={{
                    margin: '16px',
                    overflow: 'initial',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        flex: '1 0 auto'
                    }}>
                        <Breadcrumb style={{ margin: '0 0 16px 0' }}>
                            <Breadcrumb.Item href="/"><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff' }}>
                            Bill is a cat.
                        </div>
                    </div>
                    <Footer style={{
                        flexShrink: '0',
                        padding: '16px'
                    }}>
                        <TextCenter>
                            <Text disabled style={{ cursor: 'auto' }}>สงวนลิขสิทธิ์ พ.ศ. 2562 คณะเทคโนโลยีสารสนเทศ มจธ. ขอสงวนสิทธิ์ทุกประการ</Text>
                        </TextCenter>
                    </Footer>
                </Content>
            </Layout>
        </Layout>
    </Layout>
)

export default IndexPage
