package repository

import (
    "database/sql"
    "errors"
    "api/pkg/models/product"
    "encoding/json"
)

// Получить все продукты
func GetAllProducts(db *sql.DB) ([]models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.created_at, p.updated_at,
            c.name AS category, col.name AS color,
            json_agg(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'description', s.description)) AS sizes,
            t.thumbnail,
            json_agg(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image)) AS images
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN colors col ON p.color_id = col.id
        LEFT JOIN product_sizes ps ON ps.product_id = p.id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN thumbnail t ON p.id = t.product_id
        LEFT JOIN images img ON p.id = img.product_id
        GROUP BY p.id, c.name, col.name, t.thumbnail
    `
    
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []models.Product
    for rows.Next() {
        var product models.Product
        var sizesJSON, imagesJSON string

        err := rows.Scan(
            &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
            &product.Quantity, &product.Available, &product.CreatedAt, &product.UpdatedAt,
            &product.Category, &product.Color, &sizesJSON, &product.Thumbnail.Thumbnail, &imagesJSON,
        )
        
        if err != nil {
            return nil, err
        }

        // Парсинг JSON для размеров и изображений
        json.Unmarshal([]byte(sizesJSON), &product.Sizes)
        json.Unmarshal([]byte(imagesJSON), &product.Images)

        products = append(products, product)
    }

    return products, nil
}

// Получить продукт по ID
func GetProductByID(db *sql.DB, productID int) (*models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.created_at, p.updated_at,
            c.name AS category, col.name AS color,
            json_agg(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'description', s.description)) AS sizes,
            t.thumbnail,
            json_agg(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image)) AS images
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN colors col ON p.color_id = col.id
        LEFT JOIN product_sizes ps ON ps.product_id = p.id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN thumbnail t ON p.id = t.product_id
        LEFT JOIN images img ON p.id = img.product_id
        WHERE p.id = $1
        GROUP BY p.id, c.name, col.name, t.thumbnail
    `
    row := db.QueryRow(query, productID)

    var product models.Product
    var sizesJSON, imagesJSON string

    err := row.Scan(
        &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
        &product.Quantity, &product.Available, &product.CreatedAt, &product.UpdatedAt,
        &product.Category, &product.Color, &sizesJSON, &product.Thumbnail.Thumbnail, &imagesJSON,
    )
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, errors.New("product not found")
        }
        return nil, err
    }

    // Парсинг JSON для размеров и изображений
    json.Unmarshal([]byte(sizesJSON), &product.Sizes)
    json.Unmarshal([]byte(imagesJSON), &product.Images)

    return &product, nil
}

// Создать новый продукт
func CreateProduct(db *sql.DB, product *models.Product) error {
    query := `
        INSERT INTO products (title, description, price_new, price_old, quantity, available, category_id, color_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING id
    `
    err := db.QueryRow(query, product.Title, product.Description, product.PriceNew, product.PriceOld, product.Quantity, product.Available, product.CategoryID, product.ColorID).Scan(&product.ID)
    if err != nil {
        return err
    }

    // Вставляем размеры для продукта
    for _, size := range product.Sizes {
        sizeQuery := `
            INSERT INTO product_sizes (product_id, size_id)
            VALUES ($1, $2)
        `
        _, err := db.Exec(sizeQuery, product.ID, size.ID)
        if err != nil {
            return err
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
