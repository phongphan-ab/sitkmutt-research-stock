import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import './bootstrap'
import { IndexPage, LoginPage } from './pages'
import { store } from './scripts/redux';

window.axios.defaults.baseURL = '/api/'

const GlobalStyle = createGlobalStyle`
    #app {
        min-height: 100vh;

        & > .ant-layout {
            min-height: inherit;
        }
    }
`

const App = () => (
    <Provider store={store}>
        <GlobalStyle />
        <Router>
            <Route exact path="/" component={IndexPage} />
            <Route exect path="/login" component={LoginPage} />
        </Router>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'));
