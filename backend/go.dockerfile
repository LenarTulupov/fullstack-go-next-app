FROM golang:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum для загрузки зависимостей
COPY go.mod go.sum ./

# Копируем .env файл
# COPY ../.env ./

# Загружаем зависимости
RUN go mod download

# Копируем остальные файлы проекта
COPY cmd ./cmd
COPY pkg ./pkg
COPY internal ./internal

# Переходим в директорию с приложением
WORKDIR /app/cmd/e-commerce-app

# Сборка исполняемого файла с именем `api`
RUN go build -o api .

# Проверка прав доступа на исполняемый файл
RUN chmod +x api

# Запуск исполняемого файла
CMD ["./api"]




# Рабочий файл
# FROM golang:latest

# WORKDIR /app

# COPY backend/go.mod backend/go.sum ./

# COPY .env ./

# RUN go mod download

# COPY backend/cmd ./cmd
# COPY backend/pkg ./pkg
# COPY backend/internal ./internal 

# WORKDIR /app/cmd/e-commerce-app

# RUN go build -o api .

# RUN chmod +x api

# CMD ["./api"]