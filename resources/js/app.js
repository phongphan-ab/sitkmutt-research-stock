import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './bootstrap'
import { IndexPage } from './pages'

const App = () => (
    <Router>
        <Route exact path="/" component={IndexPage} />
    </Router>
)

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
