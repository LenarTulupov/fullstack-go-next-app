package repository

import (
    "database/sql"
    "log"
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
    rows, err := r.db.Query("SELECT id, title, description, price_new, price_old, quantity, available, category_id, color_id, thumbnail FROM products")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []models.Product
    for rows.Next() {
        var product models.Product
        if err := rows.Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CategoryID, &product.ColorID, &product.Thumbnail); err != nil {
            log.Fatal(err)
        }
        products = append(products, product)
    }
    return products, nil
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
    var product models.Product
    var sizes []models.Size
    var images []models.Image

    rows, err := r.db.Query(`
        SELECT p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.category_id, p.color_id, p.thumbnail,
               s.id, s.name, s.abbreviation, img.id, img.image_url
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
        WHERE p.id = $1`, id)

    if err != nil {
        return product, err
    }
    defer rows.Close()

    for rows.Next() {
        var imgID sql.NullInt32
        var imgURL sql.NullString
        var size models.Size

        err := rows.Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CategoryID, &product.ColorID, &product.Thumbnail,
            &size.ID, &size.Name, &size.Abbreviation, &imgID, &imgURL)

        if err != nil {
            return product, err
        }

        // Добавляем размеры и изображения, если они существуют
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
