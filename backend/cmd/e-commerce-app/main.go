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

func executeSchema( folderName string, fileName string,) {
    // Открытие файла schema.sql
    schemaPath := filepath.Join("..", "..", "migrations", folderName, fileName)
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

func executeSQL(folderName string, fileName string) {
	dataPath := filepath.Join("..", "..", "migrations", folderName, fileName)
	file, err := os.Open(dataPath)
	if err != nil {
		log.Fatalf("Failed to open data file: %v", err)
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("Failed to read data file: %v", err)
	}

	_, err = config.DB.Exec(string(data))
	if err != nil {
		log.Fatalf("Failed to execute data insertion: %v", err)
	}
}

func main() {
    // Загрузка конфигурации
    config.LoadConfig()

    // Создание таблиц
    executeSchema("users", "users.sql")
    executeSchema("products", "create_categories.sql")
    executeSchema("products", "create_colors.sql")
    executeSchema("products", "create_products.sql")
    executeSchema("products", "create_sizes.sql")
    executeSchema("products", "create_product_sizes.sql")
    executeSchema("products", "create_images.sql")
    // Дабаление данных в таблицы
    executeSQL("products", "insert_products.sql")

    // Настройка роутера
    r := router.SetupRouter(config.DB)
    r.Use(middleware.CORSMiddleware())

    port := ":8000"
    fmt.Printf("Server is running on port %s\n", port)

    if err := r.Run(port); err != nil {
        log.Fatal("Failed to start server: ", err)
    }
}
