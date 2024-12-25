# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения
COPY . .

# Собираем приложение для производства
RUN npm run build

# Открываем порт для доступа к приложению
EXPOSE 3000

# Запускаем Nuxt.js приложение
CMD ["npm", "run", "start"]
