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
            ps.quantity, s.available,  
            img.id AS image_id, img.image_url
        FROM products p
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.id
        LEFT JOIN images img ON p.id = img.product_id
    `
    rows, err := r.db.Query(query)
    if err != nil {
        log.Printf("Error querying products: %v", err)
        return nil, err
    }
    defer rows.Close()

    productMap := make(map[int]*models.Product)

    for rows.Next() {
        var product models.Product
        var size models.Size
        var image models.Image
        var sizeQuantity sql.NullInt32
        var sizeAvailable sql.NullBool

        err := rows.Scan(
            &product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
            &product.CategoryID, &product.ColorID, &product.Thumbnail,
            &size.ID, &size.Name, &size.Abbreviation,
            &sizeQuantity, &sizeAvailable,
            &image.ID, &image.ImageURL,
        )
        if err != nil {
            log.Printf("Error scanning row: %v", err)
            return nil, err
        }

        if _, exists := productMap[product.ID]; !exists {
            productMap[product.ID] = &product
            productMap[product.ID].Sizes = []models.Size{}
            productMap[product.ID].Images = []models.Image{}
        }

        // Обновляем количество и доступность продукта
        if sizeQuantity.Valid {
            productMap[product.ID].Quantity += int(sizeQuantity.Int32)
            if sizeQuantity.Int32 > 0 {
                productMap[product.ID].Available = true
            }
        }

        // Добавляем размеры, если они есть
        if size.ID != 0 {
            size.Quantity = int(sizeQuantity.Int32)
            size.Available = sizeAvailable.Bool
            productMap[product.ID].Sizes = append(productMap[product.ID].Sizes, size)
        }

        // Добавляем изображения, если они есть
        if image.ID != 0 && !containsImage(productMap[product.ID].Images, image) {
            productMap[product.ID].Images = append(productMap[product.ID].Images, image)
        }
    }

    var products []models.Product
    for _, product := range productMap {
        products = append(products, *product)
    }

    return products, nil
}

// Проверка на дублирование изображений
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
        SELECT 
            p.id, p.title, p.description, p.price_new, p.price_old, 
            p.quantity, p.available, p.category_id, p.color_id, p.thumbnail,
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

        // Добавляем размеры, если они есть
        if size.ID != 0 {
            sizes = append(sizes, size)
        }

        // Добавляем изображения, если они есть
        if imgID.Valid {
            images = append(images, models.Image{ID: int(imgID.Int32), ImageURL: imgURL.String})
        }
    }

    product.Sizes = sizes
    product.Images = images

    return product, nil
}
