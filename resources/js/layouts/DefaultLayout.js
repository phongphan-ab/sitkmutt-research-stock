import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Avatar, Descriptions, Dropdown, Badge, Button, Divider, Icon, Layout, List, Menu, Modal, PageHeader, Popover, Typography } from 'antd'
import styled from 'styled-components'
import 'matchmedia-polyfill/matchMedia'
import 'matchmedia-polyfill/matchMedia.addListener'
import { withTranslation } from 'react-i18next'
import iso6391 from 'iso-639-1'

import { DrawerMenu, LanguageChangeModal, NavbarSearchBox, SiderMenu } from '~/components'
import i18next from '~/scripts/i18next'
import { antdDrawerMenuToggle, antdSiderMenuToggle, openLanguageChangeModal } from '~/scripts/redux/actions'

class DefaultLayoutWithoutRedux extends Component {
    state = {
        showLanguageChangeModal: false
    }

    render() {
        const { t, title, operationBtn, children, isDrawerMenuOpen, isSiderMenuOpen, isLanguageChangeModalOpen, dispatch } = this.props
        const { Header, Sider, Content, Footer } = Layout
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

        const userMenu = () => {
            return (
                <Menu>
                    <Menu.Item>
                        <a target="_blank">{t('navbar.profile.menus.requests')}</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank">{t('navbar.profile.menus.settings')}</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank">{t('navbar.profile.menus.logout')}</a>
                    </Menu.Item>
                </Menu>
            )
        };

        return (
            <>
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
                                <NavbarSearchBox placeholder={t('navbar.search_placeholder')} style={{
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
                            <Popover placement="bottomRight" content={notificationList} title={t('navbar.notification.title')} arrowPointAtCenter>
                                <Badge count={5}>
                                    <Icon type="bell" style={{ fontSize: '24px' }} />
                                </Badge>
                            </Popover>
                            <Dropdown overlay={userMenu()}>
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
                                overflow: 'initial',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{
                                    flex: '1 0 auto',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {
                                        title || operationBtn || breadcrumbData.length > 0
                                        ? (
                                            <div style={{ background: '#fff' }}>
                                                <PageHeader title={title} subTitle={this.props.subtitle ? this.props.subtitle : null} breadcrumb={{breadcrumbData}}
                                                    style={{
                                                        padding: '16px'
                                                    }}
                                                    extra={operationBtn}
                                                >
                                                    {
                                                        this.props.descriptionItems
                                                        ? (
                                                            <Descriptions size="small" column={3}>
                                                                {this.props.descriptionItems}
                                                            </Descriptions>
                                                        )
                                                        : null
                                                    }
                                                </PageHeader>
                                            </div>
                                        )
                                        : null
                                    }
                                    { children
                                        ? (
                                            <div style={{
                                                flex: '1 0 auto',
                                                padding: '16px',
                                                margin: '16px',
                                                background: '#fff'
                                            }}>
                                                {children}
                                            </div>
                                        )
                                        : null
                                    }
                                </div>
                                <Footer style={{
                                    flexShrink: '0',
                                    padding: '16px'
                                }}>
                                    <TextCenter>
                                        <Text disabled style={{ cursor: 'auto' }}>{t('footer.copyright_text', {'year_ad': new Date().getFullYear()})}</Text>
                                        <Divider type="vertical" />
                                        <a onClick={() => dispatch(openLanguageChangeModal(true))}><small><Icon type="global" /> {iso6391.getNativeName(i18next.language)} (Change Language)</small></a>
                                    </TextCenter>
                                </Footer>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
                <LanguageChangeModal />
            </>
        )
    }
}

const mapStateToProps = state => ({
    isSiderMenuOpen: state.antdSiderMenu,
    isDrawerMenuOpen: state.antdDrawerMenu
})

const DefaultLayoutWithTranslation = withTranslation()(DefaultLayoutWithoutRedux)
const DefaultLayout = connect(mapStateToProps)(DefaultLayoutWithTranslation)

export default DefaultLayout
