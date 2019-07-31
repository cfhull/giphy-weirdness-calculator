import React from 'react'
import { Link } from 'react-router-dom'
import './calculator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'

import {
  updateSearchTerm,
  updateWeirdness,
  updateResultGIF,
  updateLikedGIFs,
} from '../redux/actions.js'
import { searchByWeirdness } from '../api'

const Calculator = () => {
  const searchTerm = useSelector(state => state.search.searchTerm)
  const weirdness = useSelector(state => state.search.weirdness)
  const resultGIF = useSelector(state => state.search.resultGIF)
  const isLoading = useSelector(state => state.search.isLoading)

  const dispatch = useDispatch()

  function search() {
    searchByWeirdness(searchTerm, weirdness).then(data => {
      dispatch(
        updateResultGIF({
          id: data.data.data.id,
          title: data.data.data.title,
          weirdness,
        })
      )
      dispatch(updateWeirdness(0))
    })
  }

  function changeWeirdness(newWeirdness) {
    searchByWeirdness(searchTerm, newWeirdness).then(data => {
      // see https://github.com/facebook/react/issues/7614
      if (!data) return
      dispatch(
        updateResultGIF({
          id: data.data.data.id,
          title: data.data.data.title,
          weirdness: newWeirdness,
        })
      )
      dispatch(updateWeirdness(newWeirdness))
    })
  }

  function likeGIF() {
    dispatch(updateLikedGIFs(resultGIF))
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
            <button type="button" onClick={search} disabled={!searchTerm}>
              SEARCH
            </button>
          </div>
        </div>
      </div>
      <div className="result">
        <h1>Your Result</h1>
        <div className="gif-title">{resultGIF.title || <>&nbsp;</>}</div>
        <div className="gif-container">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} size="4x" spin />
          ) : (
            <img
              src={
                resultGIF.id
                  ? `http://giphygifs.s3.amazonaws.com/media/${resultGIF.id}/giphy.gif`
                  : 'https://via.placeholder.com/250.gif?text=Waiting for Search'
              }
            />
          )}
        </div>
        <button
          type="button"
          className="btn-like"
          onClick={likeGIF}
          disabled={!resultGIF.id}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <div className="weirdness-selector">
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            onChange={e => changeWeirdness(e.currentTarget.value)}
            value={weirdness}
          />
          <label>Weirdness: {weirdness}</label>
        </div>
      </div>
      <div className="liked">
        <Link to="/results">Go to Results</Link>
      </div>
    </div>
  )
}

export default Calculator
