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
            &product.CategoryID, &product.ColorID, &sizesJSON, &product.Thumbnail.Thumbnail, &imagesJSON,
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
        &product.CategoryID, &product.ColorID, &sizesJSON, &product.Thumbnail.Thumbnail, &imagesJSON,
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

    return db.QueryRow(query,
        product.Title,
        product.Description,
        product.PriceNew,
        product.PriceOld,
        product.Quantity,
        product.Available,
        product.CategoryID,
        product.ColorID,
    ).Scan(&product.ID)
}
