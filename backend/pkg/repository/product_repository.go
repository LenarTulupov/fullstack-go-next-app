package repository

import (
    "database/sql"
    "encoding/json"
    "errors"
    "api/pkg/models/product"
    "fmt"
)

// Получить все продукты
func GetAllProducts(db *sql.DB) ([]models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, p.available, p.created_at, p.updated_at,
            c.id AS category_id, c.name AS category, col.id AS color_id, col.name AS color,
            json_agg(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'description', s.description, 'quantity', ps.quantity, 'available', ps.available)) AS sizes,
            json_agg(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image)) AS images
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN colors col ON p.color_id = col.id
        LEFT JOIN product_sizes ps ON ps.product_id = p.id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
        GROUP BY p.id, c.id, col.id
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
            &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Available,
            &product.CreatedAt, &product.UpdatedAt, &product.CategoryID, &product.Category, &product.ColorID, &product.Color,
            &sizesJSON, &imagesJSON,
        )
        
        if err != nil {
            return nil, err
        }

        // Парсинг JSON для размеров и изображений
        if err := json.Unmarshal([]byte(sizesJSON), &product.Sizes); err != nil {
            return nil, err
        }
        if err := json.Unmarshal([]byte(imagesJSON), &product.Images); err != nil {
            return nil, err
        }

        // Установка thumbnail как первой картинки из массива images
        if len(product.Images) > 0 {
            product.Thumbnail.Thumbnail = product.Images[0].URL
        }

        // Подсчет общего количества продукта на основе всех размеров
        product.Quantity = calculateTotalQuantity(product.Sizes)

        // Определение доступности на основе наличия доступных размеров
        product.Available = isProductAvailable(product.Sizes)

        products = append(products, product)
    }

    return products, nil
}

// Получить продукт по ID
func GetProductByID(db *sql.DB, productID int) (*models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, p.available, p.created_at, p.updated_at,
            c.id AS category_id, c.name AS category, col.id AS color_id, col.name AS color,
            json_agg(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'description', s.description, 'quantity', ps.quantity, 'available', ps.available)) AS sizes,
            json_agg(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image)) AS images
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN colors col ON p.color_id = col.id
        LEFT JOIN product_sizes ps ON ps.product_id = p.id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
        WHERE p.id = $1
        GROUP BY p.id, c.id, col.id
    `
    
    row := db.QueryRow(query, productID)

    var product models.Product
    var sizesJSON, imagesJSON string

    err := row.Scan(
        &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Available,
        &product.CreatedAt, &product.UpdatedAt, &product.CategoryID, &product.Category, &product.ColorID, &product.Color,
        &sizesJSON, &imagesJSON,
    )
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, errors.New("product not found")
        }
        return nil, err
    }

    // Парсинг JSON для размеров и изображений
    if err := json.Unmarshal([]byte(sizesJSON), &product.Sizes); err != nil {
        return nil, err
    }
    if err := json.Unmarshal([]byte(imagesJSON), &product.Images); err != nil {
        return nil, err
    }

    // Установка thumbnail как первой картинки из массива images
    if len(product.Images) > 0 {
        product.Thumbnail.Thumbnail = product.Images[0].URL
    }

    // Подсчет общего количества продукта на основе всех размеров
    product.Quantity = calculateTotalQuantity(product.Sizes)

    // Определение доступности на основе наличия доступных размеров
    product.Available = isProductAvailable(product.Sizes)

    return &product, nil
}

// Функция для подсчета общего количества продукта на основе всех размеров
func calculateTotalQuantity(sizes []models.Size) int {
    totalQuantity := 0
    for _, size := range sizes {
        totalQuantity += size.Quantity
    }
    return totalQuantity
}

// Функция для проверки доступности продукта на основе доступных размеров
func isProductAvailable(sizes []models.Size) bool {
    for _, size := range sizes {
        if size.Available && size.Quantity > 0 {
            return true
        }
    }
    return false
}

func CreateProduct(db *sql.DB, product *models.Product) error {
    query := `
        INSERT INTO products (title, description, price_new, price_old, available, category_id, color_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING id
    `
    var productID int

    // Выполняем вставку основного продукта
    err := db.QueryRow(
        query, product.Title, product.Description, product.PriceNew, product.PriceOld, 
        product.Available, product.CategoryID, product.ColorID,
    ).Scan(&productID)

    if err != nil {
        return fmt.Errorf("failed to insert product: %v", err)
    }

    // Вставка размеров продукта
    for _, size := range product.Sizes {
        sizeQuery := `
            INSERT INTO product_sizes (product_id, size_id, quantity, available)
            VALUES ($1, $2, $3, $4)
        `
        _, err := db.Exec(sizeQuery, productID, size.ID, size.Quantity, size.Available)
        if err != nil {
            return fmt.Errorf("failed to insert product sizes: %v", err)
        }
    }

    // Вставка изображений продукта
    for _, image := range product.Images {
        imageQuery := `
            INSERT INTO images (product_id, image)
            VALUES ($1, $2)
        `
        _, err := db.Exec(imageQuery, productID, image.URL)
        if err != nil {
            return fmt.Errorf("failed to insert product images: %v", err)
        }
    }

    return nil
}
