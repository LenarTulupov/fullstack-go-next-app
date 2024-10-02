package repository

import (
    "database/sql"
    "api/pkg/models/product"
)

type ProductRepository interface {
    GetAll() ([]models.Product, error)
    GetByID(id int) (models.Product, error)
}

type productRepository struct {
    db *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
    return &productRepository{db}
}

func (r *productRepository) GetAll() ([]models.Product, error) {
    query := `
        SELECT 
            p.id, 
            p.title, 
            p.description, 
            p.price_new, 
            p.price_old, 
            p.quantity AS product_quantity, 
            p.available, 
            p.category_id, 
            p.color_id,
            s.id AS size_id,
            ps.quantity AS size_quantity,
            s.abbreviation AS size_abbreviation,
            s.available AS size_available,
            i.image_url,
            p.thumbnail
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images i ON p.id = i.product_id
        ORDER BY p.id, s.id;
    `
    
    rows, err := r.db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []models.Product

    for rows.Next() {
        var p models.Product
        var size models.Size // Assuming you have a Size struct in your models

        err := rows.Scan(
            &p.ID,
            &p.Title,
            &p.Description,
            &p.PriceNew,
            &p.PriceOld,
            &p.Quantity,
            &p.Available,
            &p.CategoryID,
            &p.ColorID,
            &size.ID,
            &size.Quantity,
            &size.Abbreviation,
            &size.Available,
            &p.Thumbnail,
        )
        if err != nil {
            return nil, err
        }

        // Append size information to product's sizes slice
        if size.ID != 0 { // Only add size if it exists
            p.Sizes = append(p.Sizes, size)
        }

        products = append(products, p)
    }

    return products, nil
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
    var product models.Product
    var sizes []models.Size
    var images []models.Image

    query := `
        SELECT p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.category_id, p.color_id, p.thumbnail,
               s.id, s.abbreviation, img.id, img.image_url
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
        WHERE p.id = $1
    `

    rows, err := r.db.Query(query, id)
    if err != nil {
        return product, err
    }
    defer rows.Close()

    for rows.Next() {
        var imgID sql.NullInt32
        var imgURL sql.NullString
        var size models.Size

        err := rows.Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CategoryID, &product.ColorID, &product.Thumbnail,
            &size.ID, &size.Abbreviation, &imgID, &imgURL)

        if err != nil {
            return product, err
        }

        if size.ID != 0 {
            sizes = append(sizes, size)
        }
        if imgID.Valid {
            images = append(images, models.Image{ID: int(imgID.Int32), ImageURL: imgURL.String})
        }
    }

    product.Sizes = sizes
    product.Images = images

    return product, nil
}
