export const FILM_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getFilms = () => {
  return fetch(`${FILM_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status)
      } else {
        return res.json();
      }
    })
}