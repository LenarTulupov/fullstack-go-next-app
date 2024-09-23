package models

type Product struct {
    ID              int             `json:"id"`
    Title           string          `json:"title"`
    Subtitle        *string         `json:"subtitle,omitempty"`
    Description     string          `json:"description"`
    PriceNew        string          `json:"price_new"`
    PriceOld        *string         `json:"price_old,omitempty"` 
    Quantity        int             `json:"quantity"`
    Available       bool            `json:"available"`
    CreatedAt       *string         `json:"created_at,omitempty"`
    UpdatedAt       *string         `json:"updated_at,omitempty"`
    CategoryID      *int            `json:"category_id,omitempty"`
    CategoryName    *string         `json:"category_name,omitempty"`
    AddedToCart     bool            `json:"added_to_cart"`
    AverageRating   float64         `json:"average_rating"`
    Categories      []Category      `json:"categories"` 
    Sizes           []Size          `json:"sizes"`
    ProductColors   []ColorInfo     `json:"product_colors"`
}

type Size struct {
    ID           int    `json:"id"`
    Name         string `json:"name"`
    Abbreviation string `json:"abbreviation"`
    Description  string `json:"description,omitempty"`
}

type ColorInfo struct {
    ID     int      `json:"id"`
    Name   string   `json:"color_name"`
    Images []string `json:"images"`
}

type Category struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

type ProductColor struct {
    ID                 int          `json:"id"`
    ProductID          int          `json:"product_id"`
    ColorID            int          `json:"color_id"`
    Image              *string      `json:"image,omitempty"`
    CreatedAt          *string      `json:"created_at,omitempty"`
    UpdatedAt          *string      `json:"updated_at,omitempty"`
    Color              Color        `json:"color"`
    ProductColorImages []Image      `json:"product_color_images"`
}

type Color struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

type Image struct {
    ID            int     `json:"id"`
    ProductColorID int    `json:"product_color_id"`
    ImagePath     string  `json:"image_path"`
    CreatedAt     *string `json:"created_at,omitempty"`
    UpdatedAt     *string `json:"updated_at,omitempty"`
}
