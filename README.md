
<h1 align="center">Тестовое: реестр документов</h1>

### Примечание

<p>Список документов подгружается с базы данных MongoDb, дата у каждого объекта была сгенерирована автоматически. Так как данные были отправлено в базу одним запросом, то у каждого объекта дата создания одинаковая: 16.09.2022г.</p>

<p>Если фильтры не испольуются, то при скрооле до конца страницы в общий список подгружается по 12 объектов из глобального хранилища Redux. Полные данные списка были загружены с сервера сразу для упрощения поиска.</p>

### Инструменты

- React.js
- TypeScript
- Node.js(express)
- styled-components
- Redux(toolkit)
- JavaScript
- HTML
- CSS(SCSS)

**Версия node: 14.17.0**

### Установка
Установка зависимостей для проекта
```
npm install

cd client

npm install

cd ..
```
Запуск сайта для разработки
```
npm run dev
```
Запуск сайта из папки build
```
npm run client:build
npm run server:start
```