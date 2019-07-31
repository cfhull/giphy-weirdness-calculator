import React from 'react'
import { Link } from 'react-router-dom'
import './calculator.css'

const Calculator = () => (
  <div>
    Calculator
    <Link to="/results">Go to Results</Link>
  </div>
)

export default Calculator
