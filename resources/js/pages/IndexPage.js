import React from 'react'
import { Layout, Menu, Input, Icon, Breadcrumb, Typography, Avatar, Dropdown, Badge, Divider } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import 'matchmedia-polyfill/matchMedia'
import 'matchmedia-polyfill/matchMedia.addListener'

import { SiderMenu, DrawerMenu, NavbarSearchBox } from '~/components'
import { antdDrawerMenuToggle, antdSiderMenuToggle } from '~/scripts/redux/actions'

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

const notificationData = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
];

const breadcrumbData = [];

const notificationList = (
    <List
        itemLayout="horizontal"
        dataSource={notificationData}
        renderItem={item => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
        )}
    />
);

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

const IndexPageWithRedux = ({title, children, isDrawerMenuOpen, isSiderMenuOpen, dispatch }) => (
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
                    <Icon className="trigger" type="menu" onClick={() => {
                        dispatch(
                            matchMedia('all and (min-width: 992px)').matches
                                ? antdSiderMenuToggle()
                                : antdDrawerMenuToggle(true) )
                            }
                        }
                        style={{
                            width: '64px',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '24px',
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    } />
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
                <Popover placement="bottomRight" content={notificationList} title="การแจ้งเตือน" arrowPointAtCenter>
                    <Badge count={5}>
                        <Icon type="bell" style={{ fontSize: '24px' }} />
                    </Badge>
                </Popover>
                <Dropdown overlay={userMenu}>
                    <a href="#">
                        <Avatar style={{ color: '#316195', backgroundColor: '#8bb1da' }}>U</Avatar>
                        <Text style={{ marginLeft: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>ชื่อจริง</Text>
                    </a>
                </Dropdown>
            </RightMenuWrapper>
        </Header>
        <DrawerMenu />
        <Layout style={{
            marginTop: '64px'
        }}>
            <Sider width={272} collapsedWidth={0} collapsed={isSiderMenuOpen} style={{
                background: '#fff',
                overflowX: 'hidden',
                overflowY: 'auto',
                height: 'calc(100vh - 64px)',
                left: 0,
                boxShadow: '1px 0 16px rgba(0, 0, 0, .10)'
            }}
            breakpoint="lg"
            onBreakpoint={broken => {
                dispatch(antdSiderMenuToggle(broken))
                if (!broken && isDrawerMenuOpen) {
                    dispatch(antdDrawerMenuToggle(false))
                }
            }}>
                <SiderMenu />
            </Sider>
            <Layout>
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

const mapStateToProps = state => ({
    isSiderMenuOpen: state.antdSiderMenu,
    isDrawerMenuOpen: state.antdDrawerMenu
})

const IndexPage = connect(mapStateToProps)(IndexPageWithRedux)

export default IndexPage
