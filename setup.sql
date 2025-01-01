-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы комнат
CREATE TABLE IF NOT EXISTS rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы сообщений
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
