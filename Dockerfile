# Используем официальный образ Node.js
FROM node:18-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Сборка приложения
RUN npm run build

# Указываем порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/main"]
