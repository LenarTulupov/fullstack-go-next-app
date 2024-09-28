package models

import "time"

type Product struct {
    ID          int         `json:"id"`
    Title       string      `json:"title"`
    Description string      `json:"description"`
    PriceNew    float64     `json:"price_new"`
    PriceOld    *float64    `json:"price_old,omitempty"`
    Quantity    int         `json:"quantity"`
    Available   bool        `json:"available"`
    CategoryID  *int        `json:"category_id,omitempty"`
    Category    string     `json:"category"`
    ColorID     *int        `json:"color_id,omitempty"` // Изменено на указатель
    Color       string       `json:"color"`
    Sizes       []Size     `json:"sizes"`
    Thumbnail   Thumbnail   `json:"thumbnail"`
    Images      []Image     `json:"images"`
    CreatedAt   time.Time   `json:"created_at"`
    UpdatedAt   time.Time   `json:"updated_at"`
}

type Size struct {
    ID           int    `json:"id"`
    Name         string `json:"name"`
    Abbreviation string `json:"abbreviation"`
    Description  string `json:"description"`
}

type Color struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
}

type Thumbnail struct {
    Thumbnail string `json:"thumbnail"`
}

type Image struct {
    ID int `json:"id"`
    URL string `json:"image_url"`
}
