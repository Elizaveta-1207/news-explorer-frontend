const BASE_URL = 'https://api.timonina-news.students.nomoredomains.rocks';
// const BASE_URL = 'http://localhost:3000';

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

const register = (email, password, name) =>
  fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);

const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });

const getUserMe = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);

const getArticles = (token) =>
  fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

const createArticle = ({ keyword, title, text, date, source, link, image }, token) =>
  fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ keyword, title, text, date, source, link, image }),
  }).then(checkResponse);

const deleteArticle = (_id, token) =>
  fetch(`${BASE_URL}/articles/${_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export { register, authorize, getUserMe, getArticles, createArticle, deleteArticle };
