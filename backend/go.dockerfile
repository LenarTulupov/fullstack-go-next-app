FROM golang:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum для загрузки зависимостей
COPY go.mod go.sum ./

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