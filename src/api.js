import axios from 'axios'

const key = 'KkLYFpgMWhRmll6ool25d1tasalOIOJA'

export const searchByWeirdness = (s, weirdness) =>
  axios
    .get(
      `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${s}&weirdness=${weirdness}`
    )
    .catch(error => console.log(error))
