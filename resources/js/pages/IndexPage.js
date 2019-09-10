import React from 'react'
import { Layout, Menu, Input, Icon, Breadcrumb } from 'antd'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu
const { Search } = Input

const IndexPage = () => (
    <Layout>
        <Header style={{ display: 'flex', position: 'fixed', zIndex: 1, width: '100%', padding: 0 }}>
            <div style={{
                display: 'flex',   
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '272px',
                    marginRight: '16px'
                }}>
                    <Icon className="trigger" type={true ? 'menu-unfold' : 'menu-fold'} onClick={null} style={{
                        width: '64px',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '24px',
                        color: '#ffffff'
                    }} />
                    <div style={{ display: 'flex' }} >
                        <img src="/images/logo-sit.svg" style={{
                            margin: '16px 0px',
                            height: '32px'
                        }} />
                        <span style={{ color: '#ffffff', fontSize: '16px' }}>ResearchStock</span>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Search placeholder="ค้นหาพัสดุที่นี่" style={{
                        width: '100%',
                        maxWidth: '640px',
                        height: '48px',
                        marginRight: '8px'
                    }} />
                </div>
                
            </div>
            <div>

            </div>
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
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }} >
                    <Menu.Item key="1">แคตตาล็อกพัสดุ</Menu.Item>
                    <SubMenu key="sub2" title={
                        <span>
                            <Icon type="laptop" />
                            แผงควบคุม
                        </span>
                        }
                    >
                        <Menu.Item key="5">ผู้ใช้</Menu.Item>
                        <Menu.Item key="2">พัสดุ</Menu.Item>
                        <Menu.Item key="3">ประเภทพัสดุ</Menu.Item>
                        <Menu.Item key="4">สถานที่เก็บพัสดุ</Menu.Item>
                        <Menu.Item key="4">การยืมและการคืนพัสดุ</Menu.Item>
                        <Menu.Item key="5">รายงาน</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 272 }}>
                <Content style={{ margin: '16px', overflow: 'initial' }} >
                    <Breadcrumb style={{ margin: '0 0 16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content>
            </Layout>
        </Layout>
    </Layout>
)

export default IndexPage