package handlers

import (
    "database/sql"
    "net/http"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt"
    "time"
    "api/pkg/config" 
)

type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

func LoginUser(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var storedPasswordHash, role string
    err := config.DB.QueryRow(`
        SELECT u.password_hash, r.role_name 
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        WHERE u.email = $1`, req.Email).Scan(&storedPasswordHash, &role)
    if err == sql.ErrNoRows {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not authenticate user"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(storedPasswordHash), []byte(req.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    // Генерация токена
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "email": req.Email,
        "role":  role, // Добавляем роль в токен
        "exp":   time.Now().Add(time.Hour * 2).Unix(),
    })

    tokenString, err := token.SignedString([]byte(config.JwtSecretKey))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}