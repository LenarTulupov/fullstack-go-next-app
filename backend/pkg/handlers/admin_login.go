// handlers/admin_login.go
package handlers

import (
    "api/pkg/config"
    "net/http"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt"
    "time"
)

type AdminLoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
    Role     string `json:"role"` // Add the Role field
}

func AdminLogin(c *gin.Context) {
    var admin AdminLoginRequest
    if err := c.ShouldBindJSON(&admin); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
        return
    }

    var storedPasswordHash string
    err := config.DB.QueryRow("SELECT password_hash, role FROM users WHERE email = $1", admin.Email).Scan(&storedPasswordHash, &admin.Role)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(storedPasswordHash), []byte(admin.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    // Generate token with role included
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "email": admin.Email,
        "role":  admin.Role,
        "exp":   time.Now().Add(time.Hour * 2).Unix(),
    })

    tokenString, err := token.SignedString([]byte(config.JwtSecretKey))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
