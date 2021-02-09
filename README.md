# news-explorer-frontend
Репозиторий внешней части проекта `News explorer`, включающий фронтэнд приложения.


### Сайт:
### [News Explorer](https://timonina-news.students.nomoredomains.rocks/)

### REST API:
### [REST API](https://api.timonina.students.nomoredomains.monster)

### Репозиторий с backend:
### [backend](https://github.com/Elizaveta-1207/news-explorer-api)
---
## О проекте:
Адаптивная веб-страничка - профиль `News Explorer`. Позволяет пользователю производить поиск новостей за последние 7 дней. Зарегистрированые пользователи могут сохранять (с возможностью удаления), понравившиеся статьи в личном кабинете.

### Состоит из:
- **Главная страница (/):** 
  - header с возможностью зарегистрироваться/авторизироваться
  - попапы аторизации, регистрации, уведомлений
  - форма поиска новостей
  - блок, который появляется после поиска новостей
  - общая информация о создателе
  - footer сайта
- **Страница с сохранёнными новостями (/saved-news):**
  - страница защищена авторизацией
  - header с возможностью выйти из профиля, перейти на главную страницу
  - блок с информацией о количестве сохраненных новостей и о ключевых словах, которые были использованы для их поиска
  - все сохранённые новости
  - footer
---
## Реализовано:
- Вёрстка, JSX + адаптив
- Логика на React:
  - работа со статьями: поиск, сохранение, удаление
  - работа с сохраненными статьями
  - добавление ключевых словам
  - изменение шапки сайта при изменении статуча пользователя (авторизирован/неавторизирован)
  - валидация форм
  - поапы: авторизация, регистрация, уведомления
- Объединены frontend и backend:
  - запросы для NewsApi ([newsapi](https://newsapi.org/))
  - запросы для MainApi ([REST API](https://api.timonina.students.nomoredomains.monster))
  - логика работы с NewsApi и MainApi

---

Работа над проектом велась с использованием макета из графического редактора **_Figma_**.