package handlers

import (
    "database/sql"
    "net/http"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt"
    "time"
    "api/pkg/config" 
    "log"
)

type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

func LoginUser(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        log.Printf("Error binding JSON: %v", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var storedPasswordHash string
    var role sql.NullString

    err := config.DB.QueryRow(`
        SELECT u.password_hash, r.role_name 
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        WHERE u.email = $1`, req.Email).Scan(&storedPasswordHash, &role)
    if err == sql.ErrNoRows {
        log.Printf("User not found: %v", req.Email)
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }
    if err != nil {
        log.Printf("Database error: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not authenticate user"})
        return
    }

    // Проверяем, есть ли роль у пользователя
    if !role.Valid {
        log.Printf("User %v has no role assigned", req.Email)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "User role is not assigned"})
        return
    }

    userRole := role.String

    if err := bcrypt.CompareHashAndPassword([]byte(storedPasswordHash), []byte(req.Password)); err != nil {
        log.Printf("Password mismatch for user: %v", req.Email)
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "email": req.Email,
        "role":  userRole,
        "exp":   time.Now().Add(time.Hour * 2).Unix(),
    })

    tokenString, err := token.SignedString([]byte(config.JwtSecretKey))
    if err != nil {
        log.Printf("Error generating token: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
        return
    }

    log.Printf("User %v logged in successfully", req.Email)
    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}