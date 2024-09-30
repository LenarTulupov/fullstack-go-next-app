package handlers

import (
    "encoding/json"
    "net/http"
    "api/pkg/services"
)

type ProductHandler struct {
    service services.ProductService
}

func NewProductHandler(service services.ProductService) *ProductHandler {
    return &ProductHandler{service}
}

func (h *ProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
    products, err := h.service.GetAllProducts()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(products)
}

func (h *ProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
    // Извлечение ID из запроса и получение продукта
}
