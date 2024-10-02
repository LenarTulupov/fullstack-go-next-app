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
    rows, err := r.db.Query(
        `SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, 
            p.category_id, p.color_id, p.thumbnail, 
            s.id AS size_id, s.name AS size_name, s.abbreviation AS size_abbreviation,
            ps.quantity, ps.available,  -- добавляем количество и доступность размера
            img.id AS image_id, img.image_url
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id`)

    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var productMap = make(map[int]*models.Product)

    for rows.Next() {
        var product models.Product
        var size models.Size
        var image models.Image
        var sizeQuantity int
        var sizeAvailable bool

        err := rows.Scan(
            &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
            &product.CategoryID, &product.ColorID, &product.Thumbnail,
            &size.ID, &size.Name, &size.Abbreviation,
            &sizeQuantity, &sizeAvailable,  // получаем количество и доступность размера
            &image.ID, &image.ImageURL,
        )
        if err != nil {
            return nil, err
        }

        // Если продукт еще не добавлен в мапу, добавляем его
        if _, exists := productMap[product.ID]; !exists {
            productMap[product.ID] = &product
            productMap[product.ID].Sizes = []models.Size{} // инициализируем массив размеров
        }

        // Обновляем количество и доступность
        productMap[product.ID].Quantity += sizeQuantity
        if sizeQuantity > 0 {
            productMap[product.ID].Available = true
        }

        // Добавляем размер к продукту
        if size.ID != 0 {
            size.Quantity = sizeQuantity
            size.Available = sizeAvailable
            productMap[product.ID].Sizes = append(productMap[product.ID].Sizes, size)
        }

        // Добавляем изображение
        if image.ID != 0 {
            if !containsImage(productMap[product.ID].Images, image) {
                productMap[product.ID].Images = append(productMap[product.ID].Images, image)
            }
        }
    }

    var products []models.Product
    for _, product := range productMap {
        products = append(products, *product)
    }

    return products, nil
}

func containsSize(sizes []models.Size, size models.Size) bool {
    for _, s := range sizes {
        if s.ID == size.ID {
            return true
        }
    }
    return false
}

func containsImage(images []models.Image, image models.Image) bool {
    for _, img := range images {
        if img.ID == image.ID {
            return true
        }
    }
    return false
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
    var product models.Product
    var sizes []models.Size
    var images []models.Image

    query := `
        SELECT p.id, p.title, p.description, p.price_new, p.price_old, p.quantity, p.available, p.category_id, p.color_id, p.thumbnail,
               s.id, s.name, s.abbreviation, img.id, img.image_url
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
            &size.ID, &size.Name, &size.Abbreviation, &imgID, &imgURL)

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
