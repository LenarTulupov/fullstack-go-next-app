// handlers/admin_login.go
package handlers

import (
    "api/pkg/config"
    "net/http"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt"
    "time"
    "database/sql"
    "fmt"
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

    var storedPasswordHash, role string
    err := config.DB.QueryRow(`
        SELECT u.password_hash, r.role_name 
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        WHERE u.email = $1`, admin.Email).Scan(&storedPasswordHash, &role)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
        }
        return
    }

    fmt.Println("Stored password hash:", storedPasswordHash)
    fmt.Println("Role:", role)

    if err := bcrypt.CompareHashAndPassword([]byte(storedPasswordHash), []byte(admin.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
        return
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "email": admin.Email,
        "role":  role,
        "exp":   time.Now().Add(time.Hour * 2).Unix(),
    })

    tokenString, err := token.SignedString([]byte(config.JwtSecretKey))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
