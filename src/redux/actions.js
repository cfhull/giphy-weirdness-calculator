const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'
const UPDATE_WEIRDNESS = 'UPDATE_WEIRDNESS'
const UPDATE_RESULT_GIF = 'UPDATE_RESULT_GIF'
const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING'
const UPDATE_LIKED_GIFS = 'UPDATE_LIKED_GIFS'

export const updateSearchTerm = term => ({
  type: UPDATE_SEARCH_TERM,
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
