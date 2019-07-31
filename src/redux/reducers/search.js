const initialState = {
  searchTerm: '',
  weirdness: 0,
  resultGIF: {
    id: '',
    weirdness: 0,
  },
  isLoading: false,
  likedGIFs: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return { ...state, searchTerm: action.payload.term }
    case 'UPDATE_WEIRDNESS':
      return { ...state, weirdness: action.payload.weirdness }
    case 'UPDATE_RESULT_GIF':
      return { ...state, resultGIF: action.payload.gif }
    case 'UPDATE_IS_LOADING':
      return { ...state, isLoading: action.payload.isLoading }
    case 'UPDATE_LIKED_GIFS':
      return {
        ...state,
        likedGIFs: [...state.likedGIFs, action.payload.gif],
      }
    default:
      return state
  }
}
