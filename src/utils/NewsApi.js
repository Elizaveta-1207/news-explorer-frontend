// получаю сегодняшнюю дату и перевожу её в формат, который получаю с запроса к newsapi.org
const today = new Date();
const toDate = today.toISOString();

//получаю время на неделю (7 дней) назад от нынешней даты и перевожу его в формат, который получаю с запроса к newsapi.org
const inWeek = new Date();
inWeek.setDate(inWeek.getDate() - 7);
const fromDate = inWeek.toISOString();

const NEWS_OPTIONS = {
  newsApi: 'https://newsapi.org/v2/everything',
  apiKey: '5274598129cb4726b1e7d60d36a7e7a6',
  from: toDate.slice(0, 10),
  to: fromDate.slice(0, 10),
  pageSize: 3,
};

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

const getNews = (request) => {
  const getUrl =
    NEWS_OPTIONS.newsApi +
    '?q=' +
    request +
    '&apiKey=' +
    NEWS_OPTIONS.apiKey +
    '&from=' +
    NEWS_OPTIONS.from +
    '&to=' +
    NEWS_OPTIONS.to +
    '&pageSize=' +
    NEWS_OPTIONS.pageSize +
    '&sortBy=popularity';
  return fetch(getUrl, {
    method: 'GET',
  }).then(checkResponse);
};

export default getNews;
