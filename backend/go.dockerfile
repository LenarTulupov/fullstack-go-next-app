FROM golang:latest

WORKDIR /app

COPY . .

# Download and install the dependencies:
RUN go get -d -v ./...

# Build the go app
RUN go build -o api .

EXPOSE 8000

CMD ["./api"]

# FROM golang:1.20 AS builder

# WORKDIR /app

# # Копирование файлов зависимостей
# COPY go.mod go.sum ./
# RUN go mod download

# # Копирование исходного кода
# COPY . .

# # Построение приложения
# RUN go build -o api .

# # Создание минимального образа
# FROM scratch

# COPY --from=builder ./api ./api

# EXPOSE 8000

# CMD ["./api"]