import React from 'react'
import { Layout, Card } from 'antd'

const { Content } = Layout

const LoginPage = () => (
    <Layout>
        <Content style={{
            display: 'flex',
            justifyContent: 'center',
            background: '#316195'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '480px'
            }}>
                <Card style={{
                    width: '100%'
                }}>

                </Card>
            </div>
        </Content>
    </Layout>
)

export default LoginPage