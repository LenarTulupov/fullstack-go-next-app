package repository

import (
	"database/sql"
	"encoding/json"
	"log"
	"api/pkg/models/product"
)

type ProductRepository interface {
	GetAll() ([]models.Product, error)
	GetByID(id int) (models.Product, error)
	GetBySlug(slug string) (models.Product, error)
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
		p.id AS product_id,
		p.title, 
		p.slug,
		p.description, 
		p.price_new, 
		p.price_old, 
		p.subcategory_id,
		subcat.name AS subcategory,
		p.color_id, 
		cl.name AS color, 
		p.thumbnail,
		p.created_at,
		p.updated_at,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image_url)) 
		FILTER (WHERE img.id IS NOT NULL), '[]') AS images,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'quantity', ps.quantity)) 
		FILTER (WHERE s.id IS NOT NULL), '[]') AS sizes,
		COALESCE(JSON_AGG(DISTINCT cat.name)
		FILTER (WHERE cat.id IS NOT NULL), '{}') AS categories
	FROM products p
	LEFT JOIN subcategories subcat ON p.subcategory_id = subcat.id
	LEFT JOIN colors cl ON p.color_id = cl.id
	LEFT JOIN images img ON p.id = img.product_id
	LEFT JOIN product_sizes ps ON p.id = ps.product_id
	LEFT JOIN sizes s ON ps.size_id = s.id
	LEFT JOIN product_categories pc ON p.id = pc.product_id
	LEFT JOIN categories cat ON pc.category_id = cat.id
	GROUP BY p.id, subcat.name, cl.name, p.created_at, p.updated_at
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
		var imagesJSON, sizesJSON, categoriesJSON string

		err := rows.Scan(
			&product.ID, &product.Title, &product.Slug, &product.Description, &product.PriceNew, &product.PriceOld,
			&product.SubcategoryID, &product.Subcategory, &product.ColorID, &product.Color, &product.Thumbnail, &product.CreatedAt, &product.UpdatedAt, 
			&imagesJSON, &sizesJSON, &categoriesJSON,
		)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			return nil, err
		}

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

		json.Unmarshal([]byte(categoriesJSON), &product.Categories)

		totalQuantity := 0
		hasAvailableSize := false

		for i := range product.Sizes {
			size := &product.Sizes[i]
			if size.Quantity > 0 {
				size.Available = true
				hasAvailableSize = true
			} else {
				size.Available = false
			}
			totalQuantity += size.Quantity
		}

		product.Quantity = totalQuantity
		product.Available = hasAvailableSize

		products = append(products, product)
	}

	return products, nil
}

// parseImages парсит JSON строку в слайс моделей Image
func parseImages(jsonData string) ([]models.Image, error) {
	var images []models.Image
	err := json.Unmarshal([]byte(jsonData), &images)
	return images, err
}

// parseSizes парсит JSON строку в слайс моделей Size
func parseSizes(jsonData string) ([]models.Size, error) {
	var sizes []models.Size
	err := json.Unmarshal([]byte(jsonData), &sizes)
	return sizes, err
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
	var product models.Product
	var imagesJSON string
	var sizesJSON string 

	query := `
		SELECT 
			p.id, 
			p.title, 
			p.slug,
			p.description, 
			p.price_new, 
			p.price_old, 
			p.subcategory_id,
			subcat.name AS subcategory,
			p.color_id, 
			cl.name AS color, 
			p.thumbnail,
			p.created_at, 
			p.updated_at,
			COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image_url)) 
				FILTER (WHERE img.id IS NOT NULL), '[]') AS images,
			COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'quantity', ps.quantity)) 
				FILTER (WHERE s.id IS NOT NULL), '[]') AS sizes
		FROM products p
		LEFT JOIN subcategories subcat ON p.subcategory_id = subcat.id
		LEFT JOIN colors cl ON p.color_id = cl.id
		LEFT JOIN images img ON p.id = img.product_id
		LEFT JOIN product_sizes ps ON p.id = ps.product_id
		LEFT JOIN sizes s ON ps.size_id = s.id
		WHERE p.id = $1
		GROUP BY p.id, subcat.name, cl.name, p.created_at, p.updated_at
	`

	rows, err := r.db.Query(query, id)
	if err != nil {
		log.Printf("Error querying product by ID: %v", err)
		return product, err
	}
	defer rows.Close()

	if rows.Next() {
		err := rows.Scan(
			&product.ID, &product.Title, &product.Slug, &product.Description, &product.PriceNew, &product.PriceOld,
			&product.SubcategoryID, &product.Subcategory, &product.ColorID, &product.Color, &product.Thumbnail, &product.CreatedAt, &product.UpdatedAt,
			&imagesJSON, 
			&sizesJSON,
		)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			return product, err
		}

		// Парсим данные изображений
		product.Images, err = parseImages(imagesJSON) 
		if err != nil {
			log.Printf("Error parsing images: %v", err)
			return product, err
		}

		// Парсим данные размеров
		product.Sizes, err = parseSizes(sizesJSON)
		if err != nil {
			log.Printf("Error parsing sizes: %v", err)
			return product, err
		}

		// Подсчитываем количество доступных размеров
		product.Quantity = 0
		product.Available = false

		for i := range product.Sizes {
			size := &product.Sizes[i]
			if size.Quantity > 0 {
				size.Available = true
				product.Available = true
			} else {
				size.Available = false
			}
			product.Quantity += size.Quantity
		}
	}

	return product, nil
}

func (r *productRepository) GetBySlug(slug string) (models.Product, error) {
	var product models.Product
	var imagesJSON, sizesJSON, categoriesJSON string

	query := `
			SELECT 
					p.id, 
					p.title, 
					p.slug,
					p.description, 
					p.price_new, 
					p.price_old, 
					p.subcategory_id,
					subcat.name AS subcategory,
					p.color_id, 
					cl.name AS color, 
					p.thumbnail,
					p.created_at,
					p.updated_at,
					COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image_url)) 
							FILTER (WHERE img.id IS NOT NULL), '[]') AS images,
					COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'quantity', ps.quantity)) 
							FILTER (WHERE s.id IS NOT NULL), '[]') AS sizes,
					COALESCE(JSON_AGG(DISTINCT cat.name)
							FILTER (WHERE cat.id IS NOT NULL), '{}') AS categories
			FROM products p
			LEFT JOIN subcategories subcat ON p.subcategory_id = subcat.id
			LEFT JOIN colors cl ON p.color_id = cl.id
			LEFT JOIN images img ON p.id = img.product_id
			LEFT JOIN product_sizes ps ON p.id = ps.product_id
			LEFT JOIN sizes s ON ps.size_id = s.id
			LEFT JOIN product_categories pc ON p.id = pc.product_id
			LEFT JOIN categories cat ON pc.category_id = cat.id
			WHERE p.slug = $1
			GROUP BY p.id, subcat.name, cl.name, p.created_at, p.updated_at
	`

	row := r.db.QueryRow(query, slug)
	err := row.Scan(
			&product.ID, &product.Title, &product.Slug, &product.Description,
			&product.PriceNew, &product.PriceOld, &product.SubcategoryID,
			&product.Subcategory, &product.ColorID, &product.Color,
			&product.Thumbnail, &product.CreatedAt, &product.UpdatedAt, &imagesJSON, &sizesJSON, &categoriesJSON,
	)
	if err != nil {
			return product, err
	}

	product.Images, err = parseImages(imagesJSON)
	if err != nil {
			return product, err
	}

	product.Sizes, err = parseSizes(sizesJSON)
	if err != nil {
			return product, err
	}

	json.Unmarshal([]byte(categoriesJSON), &product.Categories)

	totalQuantity := 0
	hasAvailableSize := false
	for i := range product.Sizes {
			size := &product.Sizes[i]
			if size.Quantity > 0 {
					size.Available = true
					hasAvailableSize = true
			} else {
					size.Available = false
			}
			totalQuantity += size.Quantity
	}
	product.Quantity = totalQuantity
	product.Available = hasAvailableSize

	return product, nil
}

