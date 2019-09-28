import React from 'react'
import { Button, Card, Form, Input, Layout, Spin, Typography } from 'antd'
import styled from 'styled-components'

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

const LoginPageWrapper = ({ form }) => {
    const { getFieldDecorator } = form
    let loadingSpinned = false

    const frmLoginSubmitHandler = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
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
                            <Spin tip="กำลังโหลด&hellip;" spinning={loadingSpinned}>
                                <Form layout="vertical" onSubmit={frmLoginSubmitHandler}>
                                    <Form.Item label="ชื่อผู้ใช้">
                                        {
                                            getFieldDecorator('username', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'โปรดป้อนชื่อผู้ใช้'
                                                }
                                            ],
                                            })(<Input size="large" placeholder="ชื่อผู้ใช้ของอีเมลของคณะ" />)
                                        }
                                    </Form.Item>
                                    <Form.Item label="รหัสผ่าน">
                                        {
                                            getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'โปรดป้อนรหัสผ่าน'
                                                }
                                            ],
                                            })(<Input type="password" size="large" placeholder="รหัสเดียวกับอีเมลของคณะ" />)
                                        }
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                                        เข้าสู่ระบบ
                                    </Button>
                                </Form>
                            </Spin>
                        </Card>
                        <Text disabled style={{
                            textAlign: 'center',
                            color: '#ffffff',
                            cursor: 'auto',
                        }}>
                            <small>สงวนลิขสิทธิ์ พ.ศ. 2562 คณะเทคโนโลยีสารสนเทศ มจธ. ขอสงวนสิทธิ์ทุกประการ</small>
                        </Text>
                    </LandingLayoutWrapper>
                </Content>
            </Layout>
    );
}
    
const LoginPage = Form.create({ name: 'login' })(LoginPageWrapper);

export default LoginPage