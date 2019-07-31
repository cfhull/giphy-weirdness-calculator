import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header/header'
import Calculator from './Calculator/calculator'
import Results from './Results/results'
import './styles.css'

export default function App() {
  return (
    <Router basename="/">
      <div className="app">
        <Header />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/'}
          component={Calculator}
        />
        <Route path={process.env.PUBLIC_URL + '/results'} component={Results} />
      </div>
    </Router>
  )
}
