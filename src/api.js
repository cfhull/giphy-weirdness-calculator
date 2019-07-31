import axios from 'axios'
import store from './redux/store'
import { updateIsLoading } from './redux/actions'

const key = 'KkLYFpgMWhRmll6ool25d1tasalOIOJA'

export const searchByWeirdness = (s, weirdness) => {
  if (store.getState().search.isLoading) return Promise.resolve()

  store.dispatch(updateIsLoading(true))
  return axios
    .get(
      `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${s}&weirdness=${weirdness}`
    )
    .catch(error => console.log(error))
    .finally(() => {
      store.dispatch(updateIsLoading(false))
    })
}
