package repository

import (
    "database/sql"
    "api/pkg/models/product"
    "log"
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
            p.id AS product_id, p.title, p.description, p.price_new, p.price_old, 
            p.category_id, p.color_id, p.thumbnail, 
            s.id AS size_id, s.name AS size_name, s.abbreviation AS size_abbreviation,
            COALESCE(ps.quantity, 0), COALESCE(s.available, FALSE),  
            img.id AS image_id, img.image_url
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
        ORDER BY p.id, s.id, img.id
    `
    rows, err := r.db.Query(query)
    if err != nil {
        log.Printf("Error querying products: %v", err)
        return nil, err
    }
    defer rows.Close()

    productMap := make(map[int]*models.Product)

    for rows.Next() {
        var productID, sizeID, imageID int
        var product models.Product
        var size models.Size
        var image models.Image
        var sizeQuantity int
        var sizeAvailable bool

        err := rows.Scan(
            &productID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
            &product.CategoryID, &product.ColorID, &product.Thumbnail,
            &sizeID, &size.Name, &size.Abbreviation,
            &sizeQuantity, &sizeAvailable,
            &imageID, &image.ImageURL,
        )
        if err != nil {
            log.Printf("Error scanning row: %v", err)
            return nil, err
        }

        // Проверяем, существует ли продукт в мапе, или создаем новый продукт
        if p, exists := productMap[productID]; exists {
            product = *p
        } else {
            product.ID = productID
            product.Sizes = []models.Size{}
            product.Images = []models.Image{}
            product.Quantity = 0 // Инициализируем количество продукта
            productMap[productID] = &product
        }

        // Добавляем уникальные размеры и обновляем количество
        if sizeID != 0 {
            size.ID = sizeID
            size.Quantity = sizeQuantity
            size.Available = sizeAvailable

            // Обновляем общее количество продукта
            productMap[productID].Quantity += sizeQuantity

            sizeExists := false
            for _, existingSize := range productMap[productID].Sizes {
                if existingSize.ID == sizeID {
                    sizeExists = true
                    break
                }
            }
            if !sizeExists {
                productMap[productID].Sizes = append(productMap[productID].Sizes, size)
            }
        }

        // Добавляем уникальные изображения
        if imageID != 0 {
            image.ID = imageID
            imageExists := false
            for _, existingImage := range productMap[productID].Images {
                if existingImage.ID == imageID {
                    imageExists = true
                    break
                }
            }
            if !imageExists {
                productMap[productID].Images = append(productMap[productID].Images, image)
            }
        }

        // Обновляем доступность продукта
        if productMap[productID].Quantity > 0 {
            productMap[productID].Available = true
        }
    }

    // Преобразуем map в слайс продуктов
    products := make([]models.Product, 0, len(productMap))
    for _, product := range productMap {
        products = append(products, *product)
    }

    return products, nil
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
    var product models.Product
    var sizes []models.Size
    var images []models.Image

    query := `
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, 
            COALESCE(p.quantity, 0), COALESCE(p.available, FALSE), p.category_id, p.color_id, p.thumbnail,
            s.id, s.name, s.abbreviation, 
            img.id, img.image_url
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
        WHERE p.id = $1
    `
    rows, err := r.db.Query(query, id)
    if err != nil {
        log.Printf("Error querying product by ID: %v", err)
        return product, err
    }
    defer rows.Close()

    for rows.Next() {
        var imgID sql.NullInt32
        var imgURL sql.NullString
        var size models.Size

        err := rows.Scan(
            &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
            &product.Quantity, &product.Available, &product.CategoryID, &product.ColorID, &product.Thumbnail,
            &size.ID, &size.Name, &size.Abbreviation,
            &imgID, &imgURL,
        )
        if err != nil {
            log.Printf("Error scanning row: %v", err)
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
