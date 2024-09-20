package models

type Product struct {
	ID            int            `json:"id"`
	Title         string         `json:"title"`
	Subtitle      *string        `json:"subtitle"`
	Description   string         `json:"description"`
	PriceNew      string         `json:"price_new"`
	PriceOld      string         `json:"price_old"`
	Quantity      int            `json:"quantity"`
	CategoryID    *int           `json:"category_id"`
	AddedToFavorite bool          `json:"added_to_favorite"`
	AddedToCart   bool           `json:"added_to_cart"`
	Available     bool           `json:"available"`
	CreatedAt     *string        `json:"created_at"`
	UpdatedAt     *string        `json:"updated_at"`
	AverageRating float64        `json:"average_rating"`
	Categories    []Category     `json:"categories"`
	ProductColors []ProductColor  `json:"product_colors"`
	Sizes         []Size         `json:"sizes"`
}

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type ProductColor struct {
	ID                 int          `json:"id"`
	ProductID          int          `json:"product_id"`
	ColorID            int          `json:"color_id"`
	Image              *string      `json:"image"`
	CreatedAt          *string      `json:"created_at"`
	UpdatedAt          *string      `json:"updated_at"`
	Color              Color        `json:"color"`
	ProductColorImages []Image      `json:"product_color_images"`
}

type Color struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Image struct {
	ID          int     `json:"id"`
	ProductColorID int   `json:"product_color_id"`
	ImagePath   string  `json:"image_path"`
	CreatedAt   *string `json:"created_at"`
	UpdatedAt   *string `json:"updated_at"`
}

type Size struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
	Description  string `json:"description"`
}
