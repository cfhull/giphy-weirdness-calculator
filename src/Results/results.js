import React from 'react'
import './results.css'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../redux/actions'

const Results = () => {
  const likedGIFs = useSelector(state => state.search.likedGIFs)
  const dispatch = useDispatch()

  const average = Math.round(
    likedGIFs.reduce((a, b) => (a += +b.weirdness), 0) / 5
  )

  return (
    <div className="results">
      <h1>You Scored an {average} out of 10 on the weirdness scale!</h1>
      <div>
        <p className="lbl-liked">The GIFs you liked</p>
        <div className="liked-gifs">
          {likedGIFs.map(gif => (
            <div key={gif.id}>
              <div className="gif-title">{gif.title || <>&nbsp;</>}</div>
              <div className="gif-container">
                <img
                  src={`http://giphygifs.s3.amazonaws.com/media/${gif.id}/giphy.gif`}
                />
              </div>
              <div>{`${gif.weirdness}/10`}</div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/" onClick={() => dispatch(reset())}>
        <button type="button">Start Over</button>
      </Link>
    </div>
  )
}

export default Results
