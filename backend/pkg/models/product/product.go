package models

import "time"

type Product struct {
	ID               int              `json:"id"`
	Title            string           `json:"title"`
	Slug             string           `json:"slug"`
	Description      string           `json:"description"`
	PriceNew         float64          `json:"price_new"`
	PriceOld         float64          `json:"price_old,omitempty"`
	Quantity         int              `json:"quantity"`
	Available        bool             `json:"available"`
	Categories       []string         `json:"categories"`
	Subcategory      *string          `json:"subcategory"`
	Color            string           `json:"color"`
	Sizes            []Size           `json:"sizes"`
	Images           []Image          `json:"images"`
	Thumbnail        string           `json:"thumbnail,omitempty"`
	ColorID          int              `json:"color_id"`
	CategoryID       *int             `json:"category_id,omitempty"`
	SubcategoryID    *int             `json:"subcategory_id"`
	Materials        []Material       `json:"materials"`
	CareInstructions []CareInstruction `json:"care_instructions"`
	Reviews          []Review         `json:"reviews"`
	CreatedAt        time.Time        `json:"created_at"`
	UpdatedAt        time.Time        `json:"updated_at"`
}

type Size struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Abbreviation string `json:"abbreviation"`
	Description  string `json:"description,omitempty"`
	Quantity     int    `json:"quantity"`
	Available    bool   `json:"available"`
}

type Image struct {
	ID       int    `json:"id"`
	ImageURL string `json:"image_url"`
}

type Material struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type CareInstruction struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Instructions string `json:"instructions"`
}

type Review struct {
	ID        int           `json:"id"`
	ProductID int           `json:"product_id"`
	UserID    int           `json:"user_id"`
	Rating    float64       `json:"rating"`
	Comment   string        `json:"comment"`
	Images    []ReviewImage `json:"images"`
	CreatedAt time.Time     `json:"created_at"`
	UpdatedAt time.Time     `json:"updated_at"`
}

type ReviewImage struct {
	ID        int       `json:"id"`
	ReviewID  int       `json:"review_id"`
	ImageURL  string    `json:"image_url"`
	CreatedAt time.Time `json:"created_at"`
}
