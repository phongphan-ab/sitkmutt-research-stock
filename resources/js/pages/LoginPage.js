import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Card, Form, Input, Layout, Spin, Typography } from 'antd'
import styled from 'styled-components'

import { frmLoginLoading } from '~/scripts/redux/actions'

const { Content } = Layout
const { Text } = Typography

const LandingLayoutWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 24px;
    flex-direction: column;
    align-items: center;

    & > * {
        justify-content: center;
        margin: 4px 0;
    }

    & > :first-child {
        margin-top: 0px;
    }

    & > :last-child {
        margin-bottom: 0px;
    }
`

const LoginPageWrapper = ({ form, isSpinSpining, dispatch }) => {
    const { t } = useTranslation()
    const { getFieldDecorator } = form
    let loadingSpinned = false

    const frmLoginSubmitHandler = (e, dispatch) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            dispatch(frmLoginLoading(true))
            if (!err) {
                
            }
        });
    };

    return (
            <Layout>
                <Content style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#316195'
                }}>
                    <LandingLayoutWrapper>
                        <div style={{
                            display: 'flex'
                        }}>
                            <img src="/images/logo-sit.svg" style={{
                                height: '48px'
                            }} />
                            <span style={{ color: '#ffffff', fontSize: '24px', lineHeight: '1em' }}>Research<br />Stock</span>
                        </div>
                        <Card style={{
                            width: '100%',
                            maxWidth: '360px'
                        }}>
                            <Spin tip={t('pages.login.spinner.loading')} spinning={isSpinSpining}>
                                <Form layout="vertical" onSubmit={(e) => frmLoginSubmitHandler(e, dispatch)}>
                                    <Form.Item label={t('pages.login.form.username.label')}>
                                        {
                                            getFieldDecorator('username', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: t('pages.login.form.username.validation.required')
                                                }
                                            ],
                                            })(<Input size="large" placeholder={t('pages.login.form.username.placeholder')} />)
                                        }
                                    </Form.Item>
                                    <Form.Item label={t('pages.login.form.password.label')}>
                                        {
                                            getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: t('pages.login.form.password.validation.required')
                                                }
                                            ],
                                            })(<Input type="password" size="large" placeholder={t('pages.login.form.password.placeholder')} />)
                                        }
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                                        {t('pages.login.button.login')}
                                    </Button>
                                </Form>
                            </Spin>
                        </Card>
                        <Text disabled style={{
                            textAlign: 'center',
                            color: '#ffffff',
                            cursor: 'auto',
                        }}>
                            <small>{t('footer.copyright_text')}</small>
                        </Text>
                    </LandingLayoutWrapper>
                </Content>
            </Layout>
    );
}
const LoginPageReduxWrapper = Form.create({ name: 'login' })(LoginPageWrapper);

const mapStateToProps = state => ({
    isSpinSpining: state.frmLoginLoading
})

const LoginPage = connect(mapStateToProps)(LoginPageReduxWrapper)

export default LoginPage
