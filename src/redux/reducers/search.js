const initialState = {
  searchTerm: '',
  weirdness: 0,
  resultGIF: {
    id: '',
  },
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      return { ...state, searchTerm: action.payload.term }
    case 'UPDATE_WEIRDNESS':
      return { ...state, weirdness: action.payload.weirdness }
    case 'UPDATE_RESULT_GIF':
      return { ...state, resultGIF: action.payload.gif }
    default:
      return state
  }
}
