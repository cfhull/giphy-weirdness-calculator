const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'
const UPDATE_SEARCH_INPUT = 'UPDATE_SEARCH_INPUT'
const UPDATE_WEIRDNESS = 'UPDATE_WEIRDNESS'
const UPDATE_RESULT_GIF = 'UPDATE_RESULT_GIF'
const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING'
const UPDATE_LIKED_GIFS = 'UPDATE_LIKED_GIFS'
const UNLIKE_GIF = 'UNLIKE_GIF'
const RESET = 'RESET'

export const updateSearchTerm = term => ({
  type: UPDATE_SEARCH_TERM,
  payload: {
    term,
  },
})

export const updateSearchInput = term => ({
  type: UPDATE_SEARCH_INPUT,
  payload: {
    term,
  },
})

export const updateWeirdness = weirdness => ({
  type: UPDATE_WEIRDNESS,
  payload: {
    weirdness,
  },
})

export const updateResultGIF = gif => ({
  type: UPDATE_RESULT_GIF,
  payload: {
    gif,
  },
})

export const updateIsLoading = isLoading => ({
  type: UPDATE_IS_LOADING,
  payload: {
    isLoading,
  },
})

export const updateLikedGIFs = gif => ({
  type: UPDATE_LIKED_GIFS,
  payload: {
    gif,
  },
})

export const unlikeGIF = gif => ({
  type: UNLIKE_GIF,
  payload: {
    gif,
  },
})

export const reset = () => ({ type: RESET })
