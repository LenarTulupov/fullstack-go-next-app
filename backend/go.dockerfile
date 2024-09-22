# Используем официальный образ Golang
FROM golang:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum для загрузки зависимостей
COPY backend/go.mod backend/go.sum ./

# Копируем .env файл из корня проекта в текущую рабочую директорию
COPY .env ./

# Загружаем зависимости
RUN go mod download

# Копируем остальные файлы проекта
COPY backend/cmd ./cmd
COPY backend/pkg ./pkg
COPY backend/internal ./internal 

# Переходим в директорию с приложением
WORKDIR /app/cmd/e-commerce-app

# Сборка исполняемого файла с именем `api`
RUN go build -o api .

# Проверка прав доступа на исполняемый файл
RUN chmod +x api

# Запуск исполняемого файла
CMD ["./api"]
