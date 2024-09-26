package main

import (
	"fmt"
    "log"
    "os"
    "path/filepath"
    "api/internal/middleware"
    "api/internal/router"
    "api/pkg/config"
    "io"
)

func executeSchema() {
    // Открытие файла schema.sql
    schemaPath := filepath.Join("..", "..", "migrations", "initial_schema.sql")
    file, err := os.Open(schemaPath)
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

func insertData() {
	// Открытие файла с данными products_schema.sql
	dataPath := filepath.Join("..", "..", "migrations", "products_data.sql")
	file, err := os.Open(dataPath)
	if err != nil {
		log.Fatalf("Failed to open data file: %v", err)
	}
	defer file.Close()

	// Чтение содержимого файла
	data, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("Failed to read data file: %v", err)
	}

	// Выполнение SQL-скрипта для вставки данных
	_, err = config.DB.Exec(string(data))
	if err != nil {
		log.Fatalf("Failed to execute data insertion: %v", err)
	}
}

func main() {
    // Загрузка конфигурации
    config.LoadConfig()

    // Создание таблиц
    executeSchema()
    // Дабаление данных в таблицы
    insertData()

    // Настройка роутера
    r := router.SetupRouter()
    r.Use(middleware.CORSMiddleware())

    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)

    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
