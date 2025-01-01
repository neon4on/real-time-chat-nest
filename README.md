<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Приложение Чат в Реальном Времи на NestJS

## Описание

Это чат-приложение в реальном времени, разработанное с использованием NestJS, Socket.io, PostgreSQL и других современных технологий. Приложение обеспечивает безопасную аутентификацию, защиту от веб-уязвимостей и поддерживает асинхронную обработку задач с помощью очередей.

## Особенности

- **Реальное время:** Обмен сообщениями в реальном времени с использованием Socket.io.
- **Аутентификация:** JWT аутентификация и авторизация пользователей.
- **Безопасность:** Защита от XSS, CSRF и SQL Injection.
- **Очереди и задачи:** Обработка асинхронных задач с помощью Bull и Redis.
- **Хранение данных:** PostgreSQL без использования ORM, с чистыми SQL запросами.
- **Мониторинг:** Интеграция с Prometheus и Grafana для мониторинга.

## Стек технологий

- **Backend:** NestJS, Socket.io, PostgreSQL, Bull, Redis
- **Безопасность:** Helmet, CSRF, JWT, bcrypt
- **Инфраструктура:** Docker, Kubernetes, Prometheus, Grafana

## Установка и Запуск

### Требования

- Docker и Docker Compose
- Node.js
- PostgreSQL
- Redis

### Шаги

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/yourusername/real-time-chat.git
   cd real-time-chat
   ```

2. **Создайте файл .env:**

    ```bash
    DATABASE_HOST=postgres
    DATABASE_PORT=5432
    DATABASE_USER=your_db_user
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=real_time_chat
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=3600s
    ```

3. **Запустите контейнеры с помощью Docker Compose:**

    ```bash
    docker-compose up -d
    ```

4. **Примените миграции:**

    ```bash
    docker exec -it real-time-chat_app_1 npm run migration:up
    ```

5. **Откройте приложение:**

Приложение будет доступно по адресу ```http://localhost:3000```.

## Stay in touch

- Author - [Valeriy Kamenskikh](https://github.com/neon4on)
- Telegram - [https://t.me/neon4on](https://t.me/neon4on)
