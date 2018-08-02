# React-blog

[English Translation](#english)

Приложение для создания статей, текстов и постов.

[Демо версия приложения](https://quiet-lake-79170.herokuapp.com/)

### Используемые технологии

* React/Redux

* Node.js

* Express

* MongoDB

### Процесс установки

Для запуска приложения на вашем компьютере необходимо выполнить следующие действия:

1. Клонировать репозиторий

    `git clone git@github.com:OneTwo7/react-blog.git`

2. Установить сторонние пакеты

    `cd react-blog`

    `npm install`

3. Создать .env и .env-dev файлы и инициализировать в них переменные среды для запуска в режиме разработки и тестирования скомпилированного приложения (переменные Amazon S3 можно не указывать, картинки будут сохраняться в  локальном каталоге - /src/img/uploads)

    - GOOGLE_CLIENT_ID,
    - GOOGLE_CLIENT_SECRET,
    - GITHUB_CLIENT_ID,
    - GITHUB_CLIENT_SECRET,
    - VK_CLIENT_ID,
    - VK_CLIENT_SECRET,
    - MONGO_URI,
    - COOKIE_KEY,
    - S3_ACCESS_KEY,
    - S3_SECRET_KEY,
    - S3_BUCKET,
    - S3_REGION,
    - SEND_GRID_KEY,
    - APP_DOMAIN,
    - UPLOADS_PATH

4. Запустить приложение

    - в режиме разработки:

        `npm run dev`

    - в режиме тестирования готового приложения:

        `npm run build`

        `npm run server:build`



## English

A simple blog application created with React/Redux.

[Application demo](https://quiet-lake-79170.herokuapp.com/)

### Technologies

* React/Redux

* Node.js

* Express

* MongoDB

### Installation process

In order to run this application on your local machine the next actions are required:

1. Clone repository

    `git clone git@github.com:OneTwo7/react-blog.git`

2. Install dependencies

    `cd react-blog`

    `npm install`

3. Create .env and .env-dev files and specify environment variables for production build test and development mode (Amazon S3 ones are optional)

    - GOOGLE_CLIENT_ID,
    - GOOGLE_CLIENT_SECRET,
    - GITHUB_CLIENT_ID,
    - GITHUB_CLIENT_SECRET,
    - VK_CLIENT_ID,
    - VK_CLIENT_SECRET,
    - MONGO_URI,
    - COOKIE_KEY,
    - S3_ACCESS_KEY,
    - S3_SECRET_KEY,
    - S3_BUCKET,
    - S3_REGION,
    - SEND_GRID_KEY,
    - APP_DOMAIN,
    - UPLOADS_PATH

4. Run application

    - in development mode:

        `npm run dev`

    - in production test mode:

        `npm run build`

        `npm run server:build`
