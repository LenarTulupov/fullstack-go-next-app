package repository

import (
    "database/sql"
    "errors"
    "api/pkg/models/product"
)

// Получить все продукты
func GetAllProducts(db *sql.DB) ([]models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.created_at, p.updated_at, c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
    `
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []models.Product
    for rows.Next() {
        var product models.Product
        var categoryName *string
        err := rows.Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CreatedAt, &product.UpdatedAt, &categoryName)
        if err != nil {
            return nil, err
        }
        product.Sizes = GetSizesForProduct(db, product.ID) 
        product.Colors = GetColorsForProduct(db, product.ID) 
        products = append(products, product)
    }

    return products, nil
}

// Получить продукт по ID
func GetProductByID(db *sql.DB, productID int) (*models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.created_at, p.updated_at, c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1
    `
    row := db.QueryRow(query, productID)

    var product models.Product
    var categoryName *string
    err := row.Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CreatedAt, &product.UpdatedAt, &categoryName)
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, errors.New("product not found")
        }
        return nil, err
    }

    product.Sizes = GetSizesForProduct(db, product.ID)
    product.Colors = GetColorsForProduct(db, product.ID)

    return &product, nil
}

// Создать новый продукт
func CreateProduct(db *sql.DB, product *models.Product) error {
    query := `
        INSERT INTO products (title, description, price_new, price_old, quantity, available, category_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING id
    `
    err := db.QueryRow(query, product.Title, product.Description, product.PriceNew, product.PriceOld, product.Quantity, product.Available, product.CategoryID).Scan(&product.ID)
    if err != nil {
        return err
    }

    // Дополнительно добавляем размеры и цвета продукта, если они указаны
    if len(product.Sizes) > 0 {
        for _, size := range product.Sizes {
            err := AddProductSize(db, product.ID, size.ID)
            if err != nil {
                return err
            }
        }
    }

    if len(product.Colors) > 0 {
        for _, color := range product.Colors {
            err := AddProductColor(db, product.ID, color.ID)
            if err != nil {
                return err
            }
        }
    }

    return nil
}

// Добавление размера для продукта
func AddProductSize(db *sql.DB, productID int, sizeID int) error {
    query := `
        INSERT INTO product_sizes (product_id, size_id) VALUES ($1, $2)
    `
    _, err := db.Exec(query, productID, sizeID)
    return err
}

// Добавление цвета для продукта
func AddProductColor(db *sql.DB, productID int, colorID int) error {
    query := `
        INSERT INTO product_colors (product_id, color_id) VALUES ($1, $2)
    `
    _, err := db.Exec(query, productID, colorID)
    return err
}

// Получить размеры продукта
func GetSizesForProduct(db *sql.DB, productID int) []models.Size {
    query := `
        SELECT s.id, s.name, s.abbreviation
        FROM product_sizes ps
        JOIN sizes s ON ps.size_id = s.id
        WHERE ps.product_id = $1
    `
    rows, err := db.Query(query, productID)
    if err != nil {
        return nil
    }
    defer rows.Close()

    var sizes []models.Size
    for rows.Next() {
        var size models.Size
        err := rows.Scan(&size.ID, &size.Name, &size.Abbreviation)
        if err != nil {
            continue
        }
        sizes = append(sizes, size)
    }

    return sizes
}

// Получить цвета продукта
func GetColorsForProduct(db *sql.DB, productID int) []models.Color {
    query := `
        SELECT c.id, c.name
        FROM product_colors pc
        JOIN colors c ON pc.color_id = c.id
        WHERE pc.product_id = $1
    `
    rows, err := db.Query(query, productID)
    if err != nil {
        return nil
    }
    defer rows.Close()

    var colors []models.Color
    for rows.Next() {
        var color models.Color
        err := rows.Scan(&color.ID, &color.Name)
        if err != nil {
            continue
        }
        colors = append(colors, color)
    }

    return colors
}
