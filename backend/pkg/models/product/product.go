package models

import (
    "time"
)

type Product struct {
    ID          int       `json:"id"`
    Title       string    `json:"title"`
    Description string    `json:"description"`
    PriceNew    float64   `json:"price_new"`
    PriceOld    float64   `json:"price_old,omitempty"`
    Quantity    int       `json:"quantity"`
    Available   bool      `json:"available"`
    CategoryID  int       `json:"category_id"`
    ColorID     int       `json:"color_id"`
    Sizes       []Size    `json:"sizes"`
    Images      []Image    `json:"images"`
    Thumbnail   string    `json:"thumbnail,omitempty"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

type Size struct {
    ID          int    `json:"id"`
    Name        string `json:"name"`
    Abbreviation string `json:"abbreviation"`
    Description string `json:"description,omitempty"`
    Quantity    int    `json:"quantity"`
    Available   bool   `json:"available"`
}

type Image struct {
    ID       int    `json:"id"`
    ImageURL string `json:"image_url"`
}
