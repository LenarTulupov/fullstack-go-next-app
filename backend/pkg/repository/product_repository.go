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
	query := `
		SELECT 
			p.id AS product_id, p.title, p.description, p.price_new, p.price_old, 
			p.category_id, p.color_id, p.thumbnail,
			img.id AS image_id, img.image_url,
			s.id AS size_id, s.name AS size_name, s.abbreviation AS size_abbreviation, s.available AS size_available, ps.quantity AS size_quantity
		FROM products p
		LEFT JOIN images img ON p.id = img.product_id
		LEFT JOIN product_sizes ps ON p.id = ps.product_id  -- таблица, связывающая продукты и размеры
		LEFT JOIN sizes s ON ps.size_id = s.id
		ORDER BY p.id, img.id, s.id
	`
	rows, err := r.db.Query(query)
	if err != nil {
		log.Printf("Error querying products: %v", err)
		return nil, err
	}
	defer rows.Close()

	productMap := make(map[int]*models.Product)

	for rows.Next() {
		var productID, imageID, sizeID int
		var product models.Product
		var image models.Image
		var imageURL string
		var size models.Size
		var sizeQuantity int  // Новая переменная для количества

		err := rows.Scan(
			&productID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld,
			&product.CategoryID, &product.ColorID, &product.Thumbnail,
			&imageID, &imageURL, 
			&sizeID, &size.Name, &size.Abbreviation, &size.Available, &sizeQuantity,
		)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil, err
		}

		// Проверка на наличие продукта
		p, exists := productMap[productID]
		if !exists {
			p = &models.Product{
				ID:          productID,
				Title:       product.Title,
				Description: product.Description,
				PriceNew:    product.PriceNew,
				PriceOld:    product.PriceOld,
				CategoryID:  product.CategoryID,
				ColorID:     product.ColorID,
				Thumbnail:   product.Thumbnail,
				Images:      []models.Image{}, 
				Sizes:       []models.Size{},  // инициализация
			}
			productMap[productID] = p
		}

		// Обрабатываем изображения
		if imageID != 0 {
			image.ID = imageID
			image.ImageURL = imageURL
			imageExists := false
			for _, img := range p.Images {
				if img.ID == imageID {
					imageExists = true
					break
				}
			}
			if !imageExists {
				p.Images = append(p.Images, image)
			}
		}

		// Обрабатываем размеры
		if sizeID != 0 {
			size.ID = sizeID
			size.Quantity = sizeQuantity // Добавляем количество для размера
			if !containsSize(p.Sizes, sizeID) { // добавление проверки на дубликаты
				p.Sizes = append(p.Sizes, size)
			}
		}
	}

	// Преобразуем мапу в слайс
	var products []models.Product
	for _, p := range productMap {
		products = append(products, *p)
	}

	return products, nil
}

// Функция проверки на дубликаты размеров
func containsSize(sizes []models.Size, sizeID int) bool {
	for _, size := range sizes {
		if size.ID == sizeID {
			return true
		}
	}
	return false
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
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
