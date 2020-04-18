### Панель управления администратора салона

Позволяет вести управление учетом клиентов.

# Requirements

* node: >=12
* npm i -g webpack-dev-server

By default app listen port: 9003

## Local development

`
npm install
npm run start
`
## Server deploy

- git pull
- npm install
- npm run build:prod
- set nginx to `app_folder/dist` route