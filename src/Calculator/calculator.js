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
        <div className="description">
          <p>
            Find out how weird you are by selecting the GIFs that make you
            laugh. We&#39;ll show you the least weird ones to start but you can
            move the slider to make them weirder.
          </p>
          <p>
            When you find a GIF you like, press the <i>Like</i> button. Once you
            like 5 GIFs, we&#39;ll show you how weird you are.
          </p>
        </div>
        <div className="search-input">
          <label htmlFor="search">Search Term</label>
          <div className="search-input-btn">
            <input
              id="search"
              type="text"
              onChange={e => dispatch(updateSearchTerm(e.currentTarget.value))}
              value={searchTerm}
            />
            <button type="button" onClick={search}>
              SEARCH
            </button>
          </div>
        </div>
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
