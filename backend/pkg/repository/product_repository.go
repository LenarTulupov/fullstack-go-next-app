package repository

import (
	"database/sql"
	"log"
	"api/pkg/models/product"
	"encoding/json"
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
			COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image_url)) 
			FILTER (WHERE img.id IS NOT NULL), '[]') AS images,
			COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'available', s.available, 'quantity', ps.quantity))
			FILTER (WHERE s.id IS NOT NULL), '[]') AS sizes
		FROM products p
		LEFT JOIN images img ON p.id = img.product_id
		LEFT JOIN product_sizes ps ON p.id = ps.product_id
		LEFT JOIN sizes s ON ps.size_id = s.id
		GROUP BY p.id
		ORDER BY p.id
	`

	rows, err := r.db.Query(query)
	if err != nil {
		log.Printf("Error querying products: %v", err)
		return nil, err
	}
	defer rows.Close()

	var products []models.Product

	for rows.Next() {
		var product models.Product
		var imagesJSON, sizesJSON string

		err := rows.Scan(
			&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
			&product.CategoryID, &product.ColorID, &product.Thumbnail,
			&imagesJSON, &sizesJSON,
		)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil, err
		}

		// Парсим JSON строки в структуры
		product.Images, err = parseImages(imagesJSON)
		if err != nil {
			log.Printf("Error parsing images: %v", err)
			return nil, err
		}

		product.Sizes, err = parseSizes(sizesJSON)
		if err != nil {
			log.Printf("Error parsing sizes: %v", err)
			return nil, err
		}

		// Подсчитываем общее количество и доступность
		for _, size := range product.Sizes {
			product.Quantity += size.Quantity
		}

		product.Available = product.Quantity > 0

		products = append(products, product)
	}

	return products, nil
}

// Парсинг JSON строк в слайсы структур
func parseImages(jsonData string) ([]models.Image, error) {
	var images []models.Image
	err := json.Unmarshal([]byte(jsonData), &images)
	return images, err
}

func parseSizes(jsonData string) ([]models.Size, error) {
	var sizes []models.Size
	err := json.Unmarshal([]byte(jsonData), &sizes)
	return sizes, err
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
	// Оставляем как есть, можно добавить агрегацию если нужно
	var product models.Product
	var images []models.Image

	query := `
		SELECT 
			p.id, p.title, p.description, p.price_new, p.price_old, 
			p.category_id, p.color_id, p.thumbnail,
			img.id, img.image_url
		FROM products p
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

		err := rows.Scan(
			&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
			&product.CategoryID, &product.ColorID, &product.Thumbnail,
			&imgID, &imgURL,
		)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			return product, err
		}

		if imgID.Valid {
			images = append(images, models.Image{ID: int(imgID.Int32), ImageURL: imgURL.String})
		}
	}

	product.Images = images

	return product, nil
}
