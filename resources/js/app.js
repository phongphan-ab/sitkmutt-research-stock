import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import './bootstrap'
import { IndexPage } from './pages'
import { store } from './scripts/redux';

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
        </Router>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'));
