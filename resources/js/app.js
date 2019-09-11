import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './bootstrap'
import { IndexPage } from './pages'
import { store } from './scripts/redux';

const App = () => (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={IndexPage} />
        </Router>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'));
