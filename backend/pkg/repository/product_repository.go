package repository

import (
    "database/sql"
    "api/pkg/models/product"
)

func GetProductWithDetails(db *sql.DB, id int) (*models.Product, error) {
    query := `
        SELECT 
            p.id, p.title, p.subtitle, p.description, p.price_new, p.price_old, p.quantity, 
            p.available, p.created_at, p.updated_at,
            c.name AS category_name,
            json_agg(json_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation)) AS sizes,
            json_agg(json_build_object('id', pc.id, 'color_name', clr.name, 'images', img.url)) AS product_colors
        FROM 
            products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_size ps ON ps.product_id = p.id
        LEFT JOIN sizes s ON s.id = ps.size_id
        LEFT JOIN product_colors pc ON pc.product_id = p.id
        LEFT JOIN colors clr ON clr.id = pc.color_id
        LEFT JOIN product_color_images img ON img.product_color_id = pc.id
        WHERE 
            p.id = $1
        GROUP BY 
            p.id, c.name;
    `

    var product models.Product
    err := db.QueryRow(query, id).Scan(
        &product.ID,
        &product.Title,
        &product.Subtitle,
        &product.Description,
        &product.PriceNew,
        &product.PriceOld,
        &product.Quantity,
        &product.Available,
        &product.CreatedAt,
        &product.UpdatedAt,
        &product.CategoryName,
        &product.Sizes,
        &product.ProductColors,
    )

    if err != nil {
        return nil, err
    }
    return &product, nil
}

func InsertProduct(db *sql.DB, product *models.Product) error {
    query := `
        INSERT INTO products (title, subtitle, description, price_new, price_old, quantity, category_id, available, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING id`

    err := db.QueryRow(query, product.Title, product.Subtitle, product.Description, product.PriceNew, product.PriceOld, product.Quantity, product.CategoryID, product.Available).Scan(&product.ID)
    if err != nil {
        return err
    }

    return nil
}

func GetAllProducts(db *sql.DB) ([]models.Product, error) {
    query := `SELECT id, title, subtitle, description, price_new, price_old, quantity, category_id, available, created_at, updated_at FROM products`
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []models.Product
    for rows.Next() {
        var product models.Product
        if err := rows.Scan(
            &product.ID,
            &product.Title,
            &product.Subtitle,
            &product.Description,
            &product.PriceNew,
            &product.PriceOld,
            &product.Quantity,
            &product.CategoryID,
            &product.Available,
            &product.CreatedAt,
            &product.UpdatedAt,
        ); err != nil {
            return nil, err
        }
        products = append(products, product)
    }

    if err := rows.Err(); err != nil {
        return nil, err
    }

    return products, nil
}
