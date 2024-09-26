package main

import (
	"fmt"
    "log"
    "os"

    "api/internal/middleware"
    "api/internal/router"
    "api/pkg/config"
    "io"
)

func executeSchema() {
    // Открытие файла schema.sql
    file, err := os.Open("schema.sql")
    if err != nil {
        log.Fatalf("Failed to open schema file: %v", err)
    }
    defer file.Close()

    // Чтение содержимого файла
    schema, err := io.ReadAll(file)
    if err != nil {
        log.Fatalf("Failed to read schema file: %v", err)
    }

    // Выполнение SQL-скрипта
    _, err = config.DB.Exec(string(schema))
    if err != nil {
        log.Fatalf("Failed to execute schema: %v", err)
    }
}

func main() {
    // Загрузка конфигурации
    config.LoadConfig()

    // Создание таблиц
    executeSchema()

    // Настройка роутера
    r := router.SetupRouter()
    r.Use(middleware.CORSMiddleware())

    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)

    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
