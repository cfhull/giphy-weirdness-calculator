const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'
const UPDATE_WEIRDNESS = 'UPDATE_WEIRDNESS'
const UPDATE_RESULT_GIF = 'UPDATE_RESULT_GIF'
const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING'

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

export const updateResultGif = (gif, weirdness) => ({
  type: UPDATE_RESULT_GIF,
  payload: {
    gif,
    weirdness,
  },
})

export const updateIsLoading = isLoading => ({
  type: UPDATE_IS_LOADING,
  payload: {
    isLoading,
  },
})
