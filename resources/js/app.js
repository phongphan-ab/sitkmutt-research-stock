import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { I18nextProvider } from 'react-i18next';

import i18next from './scripts/i18next'
import './bootstrap'
import { IndexPage, LoginPage, StocksPage, StockCategoriesPage, StockLocationsPage } from './pages'
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
        <I18nextProvider i18n={i18next}>
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route exect path="/login" component={LoginPage} />
                    <Route exect path="/cpanel/stocks" component={StocksPage} />
                    <Route exect path="/cpanel/stock_categories" component={StockCategoriesPage} />
                    <Route exect path="/cpanel/stock_locations" component={StockLocationsPage} />
                </Switch>
            </Router>
        </I18nextProvider>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'));
