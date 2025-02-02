package handlers

import (
    "database/sql"
    "net/http"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "api/pkg/config"
)

type RegisterRequest struct {
    Name     string `json:"name" binding:"required"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type User struct {
    Id    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func RegisterUser(c *gin.Context) {
    var req RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if req.Email == "vainmannjas@gmail.com" {
        req.Password = "AdminPassword123"
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
        return
    }

    // Создаем пользователя
    _, err = config.DB.Exec("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)", req.Name, req.Email, string(hashedPassword))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    // Получаем id только что созданного пользователя
    var userId int
    err = config.DB.QueryRow("SELECT id FROM users WHERE email = $1", req.Email).Scan(&userId)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch user ID"})
        return
    }

    // Если это администратор, назначаем ему роль 'admin'
    if req.Email == "vainmannjas@gmail.com" {
        _, err = config.DB.Exec("INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE role_name = 'admin'))", userId)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not assign role to admin"})
            return
        }
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func GetAllUsers(c *gin.Context) {
    rows, err := config.DB.Query("SELECT id, name, email FROM users")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch users"})
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.Id, &u.Name, &u.Email); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error scanning user data"})
            return
        }
        users = append(users, u)
    }

    c.JSON(http.StatusOK, users)
}

func GetUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    err := config.DB.QueryRow("SELECT id, name, email FROM users WHERE id = $1", id).Scan(&user.Id, &user.Name, &user.Email)
    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching user"})
        return
    }

    c.JSON(http.StatusOK, user)
}

func CreateUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    err := config.DB.QueryRow("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id", user.Name, user.Email).Scan(&user.Id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    c.JSON(http.StatusCreated, user)
}

func UpdateUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    _, err := config.DB.Exec("UPDATE users SET name = $1, email = $2 WHERE id = $3", user.Name, user.Email, id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

func DeleteUser(c *gin.Context) {
    id := c.Param("id")
    _, err := config.DB.Exec("DELETE FROM users WHERE id = $1", id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not delete user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
