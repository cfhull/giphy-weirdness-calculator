import React from 'react'
import { Link } from 'react-router-dom'
import './calculator.css'

import { useSelector, useDispatch } from 'react-redux'

import {
  updateSearchTerm,
  updateWeirdness,
  updateResultGif,
} from '../redux/actions.js'
import { searchByWeirdness } from '../api'

const Calculator = () => {
  const searchTerm = useSelector(state => state.search.searchTerm)
  const weirdness = useSelector(state => state.search.weirdness)
  const resultGIF = useSelector(state => state.search.resultGIF)

  const dispatch = useDispatch()

  function search() {
    searchByWeirdness(searchTerm, weirdness).then(data => {
      dispatch(updateResultGif({ id: data.data.data.id }))
    })
  }

  return (
    <div className="calculator">
      <div className="search">
        <input
          onChange={e => dispatch(updateSearchTerm(e.currentTarget.value))}
          value={searchTerm}
        />

        <button type="button" onClick={search}>
          SEARCH
        </button>
      </div>
      <div className="result">
        <div>
          {resultGIF.id && (
            <img
              src={`http://giphygifs.s3.amazonaws.com/media/${resultGIF.id}/giphy.gif`}
            />
          )}
        </div>
        <input
          type="range"
          min="0"
          max="10"
          onChange={e => dispatch(updateWeirdness(e.currentTarget.value))}
          value={weirdness}
        />
      </div>
      <div className="liked">
        <Link to="/results">Go to Results</Link>
      </div>
    </div>
  )
}

export default Calculator
