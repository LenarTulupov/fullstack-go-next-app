package repository

import (
	"api/pkg/models/product"
	"database/sql"
	"encoding/json"
	"errors"
	"log"
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
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', mat.id, 'name', mat.name, 'description', mat.description))
			FILTER (WHERE mat.id IS NOT NULL), '[]') AS materials,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', ci.id, 'name', ci.name, 'instructions', ci.instructions))
			FILTER (WHERE ci.id IS NOT NULL), '[]') AS care_instructions,
		COALESCE(JSON_AGG(DISTINCT cat.name) FILTER (WHERE cat.id IS NOT NULL), '[]') AS categories,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object(
			'id', r.id,
			'product_id', r.product_id,
			'user_id', r.user_id,
			'rating', r.rating,
			'comment', r.comment,
			'images', r.images,
			'created_at', r.created_at,
			'updated_at', r.updated_at
		) ) FILTER (WHERE r.id IS NOT NULL), '[]') AS reviews
	FROM products p
	LEFT JOIN subcategories subcat ON p.subcategory_id = subcat.id
	LEFT JOIN colors cl ON p.color_id = cl.id
	LEFT JOIN images img ON p.id = img.product_id
	LEFT JOIN product_sizes ps ON p.id = ps.product_id
	LEFT JOIN sizes s ON ps.size_id = s.id
	LEFT JOIN product_categories pc ON p.id = pc.product_id
	LEFT JOIN categories cat ON pc.category_id = cat.id
	LEFT JOIN product_materials pm ON p.id = pm.product_id
	LEFT JOIN materials mat ON pm.material_id = mat.id
	LEFT JOIN product_care_instructions pci ON p.id = pci.product_id
	LEFT JOIN care_instructions ci ON pci.care_instructions_id = ci.id
	LEFT JOIN reviews r ON p.id = r.product_id
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
		var imagesJSON, sizesJSON, materialsJSON, careJSON, categoriesJSON, reviewsJSON string

		err := rows.Scan(
			&product.ID, &product.Title, &product.Slug, &product.Description,
			&product.PriceNew, &product.PriceOld, &product.SubcategoryID, &product.Subcategory,
			&product.ColorID, &product.Color, &product.Thumbnail, &product.CreatedAt, &product.UpdatedAt,
			&imagesJSON, &sizesJSON, &materialsJSON, &careJSON, &categoriesJSON, &reviewsJSON,
		)
		if err != nil {
			return nil, err
		}

		product.Images, _ = parseImages(imagesJSON)
		product.Sizes, _ = parseSizes(sizesJSON)
		product.Materials, _ = parseMaterials(materialsJSON)
		product.CareInstructions, _ = parseCareInstructions(careJSON)
		json.Unmarshal([]byte(categoriesJSON), &product.Categories)
		product.Reviews, _ = parseReviews(reviewsJSON)

		totalQuantity := 0
		hasAvailableSize := false
		for i := range product.Sizes {
			if product.Sizes[i].Quantity > 0 {
				product.Sizes[i].Available = true
				hasAvailableSize = true
			}
			totalQuantity += product.Sizes[i].Quantity
		}

		product.Quantity = totalQuantity
		product.Available = hasAvailableSize

		products = append(products, product)
	}

	return products, nil
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
	query := `
	SELECT 
		p.id, p.title, p.slug, p.description, p.price_new, p.price_old, p.subcategory_id,
		subcat.name AS subcategory, p.color_id, cl.name AS color, p.thumbnail,
		p.created_at, p.updated_at,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image_url)) FILTER (WHERE img.id IS NOT NULL), '[]') AS images,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'quantity', ps.quantity)) FILTER (WHERE s.id IS NOT NULL), '[]') AS sizes,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', mat.id, 'name', mat.name, 'description', mat.description)) FILTER (WHERE mat.id IS NOT NULL), '[]') AS materials,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', ci.id, 'name', ci.name, 'instructions', ci.instructions)) FILTER (WHERE ci.id IS NOT NULL), '[]') AS care_instructions,
		COALESCE(JSON_AGG(DISTINCT cat.name) FILTER (WHERE cat.id IS NOT NULL), '[]') AS categories,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object(
			'id', r.id,
			'product_id', r.product_id,
			'user_id', r.user_id,
			'rating', r.rating,
			'comment', r.comment,
			'images', r.images,
			'created_at', r.created_at,
			'updated_at', r.updated_at
		) ) FILTER (WHERE r.id IS NOT NULL), '[]') AS reviews
	FROM products p
	LEFT JOIN subcategories subcat ON p.subcategory_id = subcat.id
	LEFT JOIN colors cl ON p.color_id = cl.id
	LEFT JOIN images img ON p.id = img.product_id
	LEFT JOIN product_sizes ps ON p.id = ps.product_id
	LEFT JOIN sizes s ON ps.size_id = s.id
	LEFT JOIN product_categories pc ON p.id = pc.product_id
	LEFT JOIN categories cat ON pc.category_id = cat.id
	LEFT JOIN product_materials pm ON p.id = pm.product_id
	LEFT JOIN materials mat ON pm.material_id = mat.id
	LEFT JOIN product_care_instructions pci ON p.id = pci.product_id
	LEFT JOIN care_instructions ci ON pci.care_instructions_id = ci.id
	LEFT JOIN reviews r ON p.id = r.product_id
	WHERE p.id = $1
	GROUP BY p.id, subcat.name, cl.name, p.created_at, p.updated_at
	`

	row := r.db.QueryRow(query, id)

	var product models.Product
	var imagesJSON, sizesJSON, materialsJSON, careJSON, categoriesJSON, reviewsJSON string

	err := row.Scan(
		&product.ID, &product.Title, &product.Slug, &product.Description,
		&product.PriceNew, &product.PriceOld, &product.SubcategoryID, &product.Subcategory,
		&product.ColorID, &product.Color, &product.Thumbnail, &product.CreatedAt, &product.UpdatedAt,
		&imagesJSON, &sizesJSON, &materialsJSON, &careJSON, &categoriesJSON, &reviewsJSON,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return product, ErrNotFound
		}
		return product, err
	}

	product.Images, _ = parseImages(imagesJSON)
	product.Sizes, _ = parseSizes(sizesJSON)
	product.Materials, _ = parseMaterials(materialsJSON)
	product.CareInstructions, _ = parseCareInstructions(careJSON)
	json.Unmarshal([]byte(categoriesJSON), &product.Categories)
	product.Reviews, _ = parseReviews(reviewsJSON)

	totalQuantity := 0
	hasAvailableSize := false
	for i := range product.Sizes {
		if product.Sizes[i].Quantity > 0 {
			product.Sizes[i].Available = true
			hasAvailableSize = true
		}
		totalQuantity += product.Sizes[i].Quantity
	}

	product.Quantity = totalQuantity
	product.Available = hasAvailableSize

	return product, nil
}

func (r *productRepository) GetBySlug(slug string) (models.Product, error) {
	query := `
	SELECT 
		p.id, p.title, p.slug, p.description, p.price_new, p.price_old, p.subcategory_id,
		subcat.name AS subcategory, p.color_id, cl.name AS color, p.thumbnail,
		p.created_at, p.updated_at,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', img.id, 'image_url', img.image_url)) FILTER (WHERE img.id IS NOT NULL), '[]') AS images,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', s.id, 'name', s.name, 'abbreviation', s.abbreviation, 'quantity', ps.quantity)) FILTER (WHERE s.id IS NOT NULL), '[]') AS sizes,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', mat.id, 'name', mat.name, 'description', mat.description)) FILTER (WHERE mat.id IS NOT NULL), '[]') AS materials,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object('id', ci.id, 'name', ci.name, 'instructions', ci.instructions)) FILTER (WHERE ci.id IS NOT NULL), '[]') AS care_instructions,
		COALESCE(JSON_AGG(DISTINCT cat.name) FILTER (WHERE cat.id IS NOT NULL), '[]') AS categories,
		COALESCE(JSON_AGG(DISTINCT jsonb_build_object(
			'id', r.id,
			'product_id', r.product_id,
			'user_id', r.user_id,
			'rating', r.rating,
			'comment', r.comment,
			'images', r.images,
			'created_at', r.created_at,
			'updated_at', r.updated_at
		) ) FILTER (WHERE r.id IS NOT NULL), '[]') AS reviews
	FROM products p
	LEFT JOIN subcategories subcat ON p.subcategory_id = subcat.id
	LEFT JOIN colors cl ON p.color_id = cl.id
	LEFT JOIN images img ON p.id = img.product_id
	LEFT JOIN product_sizes ps ON p.id = ps.product_id
	LEFT JOIN sizes s ON ps.size_id = s.id
	LEFT JOIN product_categories pc ON p.id = pc.product_id
	LEFT JOIN categories cat ON pc.category_id = cat.id
	LEFT JOIN product_materials pm ON p.id = pm.product_id
	LEFT JOIN materials mat ON pm.material_id = mat.id
	LEFT JOIN product_care_instructions pci ON p.id = pci.product_id
	LEFT JOIN care_instructions ci ON pci.care_instructions_id = ci.id
	LEFT JOIN reviews r ON p.id = r.product_id
	WHERE p.slug = $1
	GROUP BY p.id, subcat.name, cl.name, p.created_at, p.updated_at
	`

	row := r.db.QueryRow(query, slug)

	var product models.Product
	var imagesJSON, sizesJSON, materialsJSON, careJSON, categoriesJSON, reviewsJSON string

	err := row.Scan(
		&product.ID, &product.Title, &product.Slug, &product.Description,
		&product.PriceNew, &product.PriceOld, &product.SubcategoryID, &product.Subcategory,
		&product.ColorID, &product.Color, &product.Thumbnail, &product.CreatedAt, &product.UpdatedAt,
		&imagesJSON, &sizesJSON, &materialsJSON, &careJSON, &categoriesJSON, &reviewsJSON,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return product, ErrNotFound
		}
		return product, err
	}

	product.Images, _ = parseImages(imagesJSON)
	product.Sizes, _ = parseSizes(sizesJSON)
	product.Materials, _ = parseMaterials(materialsJSON)
	product.CareInstructions, _ = parseCareInstructions(careJSON)
	json.Unmarshal([]byte(categoriesJSON), &product.Categories)
	product.Reviews, _ = parseReviews(reviewsJSON)

	totalQuantity := 0
	hasAvailableSize := false
	for i := range product.Sizes {
		if product.Sizes[i].Quantity > 0 {
			product.Sizes[i].Available = true
			hasAvailableSize = true
		}
		totalQuantity += product.Sizes[i].Quantity
	}

	product.Quantity = totalQuantity
	product.Available = hasAvailableSize

	return product, nil
}

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

func parseMaterials(jsonData string) ([]models.Material, error) {
	var materials []models.Material
	err := json.Unmarshal([]byte(jsonData), &materials)
	return materials, err
}

func parseCareInstructions(jsonData string) ([]models.CareInstruction, error) {
	var care []models.CareInstruction
	err := json.Unmarshal([]byte(jsonData), &care)
	return care, err
}

func parseReviews(jsonData string) ([]models.Review, error) {
	var reviews []models.Review
	err := json.Unmarshal([]byte(jsonData), &reviews)
	return reviews, err
}

var ErrNotFound = errors.New("not found")
