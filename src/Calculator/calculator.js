import React from 'react'
import { Link } from 'react-router-dom'
import './calculator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbsUp,
  faSpinner,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'

import {
  updateSearchTerm,
  updateSearchInput,
  updateWeirdness,
  updateResultGIF,
  updateLikedGIFs,
  unlikeGIF,
} from '../redux/actions.js'
import { searchByWeirdness } from '../api'

const Calculator = () => {
  const searchTerm = useSelector(state => state.search.searchTerm)
  const searchInput = useSelector(state => state.search.searchInput)
  const weirdness = useSelector(state => state.search.weirdness)
  const resultGIF = useSelector(state => state.search.resultGIF)
  const isLoading = useSelector(state => state.search.isLoading)
  const likedGIFs = useSelector(state => state.search.likedGIFs)

  const dispatch = useDispatch()

  const likedGIFHolders = []
  for (let i = 0; i < 5; i++) {
    likedGIFHolders.push(
      <div key={likedGIFs[i] ? likedGIFs[i].id : i}>
        <div className="gif-title">
          {(likedGIFs[i] && likedGIFs[i].title) || <>&nbsp;</>}
        </div>
        <div className="gif-container">
          <img
            src={
              likedGIFs[i] && likedGIFs[i].id
                ? `http://giphygifs.s3.amazonaws.com/media/${likedGIFs[i].id}/giphy.gif`
                : 'https://via.placeholder.com/250.gif?text=Like a GIF'
            }
          />
          {likedGIFs[i] && (
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="remove"
              onClick={() => removeLiked(likedGIFs[i])}
            />
          )}
        </div>
      </div>
    )
  }

  function search() {
    searchByWeirdness(searchInput, weirdness).then(data => {
      dispatch(
        updateResultGIF({
          id: data.data.data.id,
          title: data.data.data.title,
          weirdness,
          searchTerm: searchInput,
        })
      )
      dispatch(updateWeirdness(0))
      dispatch(updateSearchTerm(searchInput))
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
          searchTerm,
        })
      )
      dispatch(updateWeirdness(newWeirdness))
    })
  }

  function likeGIF() {
    dispatch(updateLikedGIFs(resultGIF))
  }

  function removeLiked(gif) {
    dispatch(unlikeGIF(gif))
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
              onChange={e => dispatch(updateSearchInput(e.currentTarget.value))}
              onKeyDown={e => {
                if (e.key === 'Enter' && searchInput) {
                  search()
                }
              }}
              value={searchInput}
            />
            <button type="button" onClick={search} disabled={!searchInput}>
              SEARCH
            </button>
          </div>
        </div>
      </div>
      <div className="result">
        <h1>YOUR RESULT</h1>
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
          disabled={
            !resultGIF.id ||
            likedGIFs.map(x => x.id).includes(resultGIF.id) ||
            likedGIFs.map(x => x.searchTerm).includes(searchTerm)
          }
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
        <h1>YOUR LIKED GIFS</h1>
        <div className="liked-gifs">{likedGIFHolders}</div>
        <div className="calculate">
          <Link to="/results">
            <button type="button" disabled={likedGIFs.length < 5}>
              Calculate My Weirdness Score
            </button>
          </Link>
          {likedGIFs.length < 5 ? (
            <p>
              You must <i>Like</i> {5 - likedGIFs.length} more GIF
              {likedGIFs.length < 4 && 's'} to calculate your score
            </p>
          ) : (
            <p>
              <>&nbsp;</>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator
