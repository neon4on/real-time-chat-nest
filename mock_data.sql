-- Вставка моковых пользователей
INSERT INTO users (username, password)
VALUES
('alice', '$2b$10$EixZaYVK1fsbw1ZfbX3OXe.PuCJ3a2x5Q0V/qReE2JhGLQFUKoQyK'), -- Пароль: password123
('bob', '$2b$10$KIXa1YjT1fsbw1ZfbX3OXe.PuCJ3a2x5Q0V/qReE2JhGLQFUKoQyK'),   -- Пароль: password123
('charlie', '$2b$10$NIXa1YjT1fsbw1ZfbX3OXe.PuCJ3a2x5Q0V/qReE2JhGLQFUKoQyK'); -- Пароль: password123

-- Вставка моковых комнат
INSERT INTO rooms (name, description)
VALUES
('General', 'Общие обсуждения и приветствия'),
('Tech', 'Технологические темы и обсуждения'),
('Random', 'Случайные темы и развлечения');

-- Вставка моковых сообщений
INSERT INTO messages (username, room_id, message)
VALUES
('alice', 1, 'Здарова)'),
('bob', 1, 'Привет, Алиса! Рад видеть тебя здесь'),
('charlie', 2, 'Кто-нибудь интересуется NestJS?'),
('alice', 2, 'Да, давно с ним работаю'),
('bob', 3, 'Кто-нибудь смотрел последний эпизод всеми любимого сериала Silo?');

