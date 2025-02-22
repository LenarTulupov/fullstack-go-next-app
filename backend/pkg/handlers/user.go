package handlers

import (
    "database/sql"
    "net/http"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
    "api/pkg/config"
    "log"
    "encoding/json"
)

type RegisterRequest struct {
    Username string `json:"username" binding:"required"` // Заменили name на username
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type User struct {
    Id       int      `json:"id"`
    Username string   `json:"username"`
    Email    string   `json:"email"`
    Roles    []string `json:"roles"`
}

func RegisterUser(c *gin.Context) {
    var req RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Хэшируем пароль
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
        return
    }

    // Создаем пользователя
    var userId int
    err = config.DB.QueryRow(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
        req.Username, req.Email, string(hashedPassword),
    ).Scan(&userId)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
        return
    }

    // Назначаем роль 'user' по умолчанию
    _, err = config.DB.Exec(
        "INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE role_name = 'user'))",
        userId,
    )
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not assign default role to user"})
        return
    }

    // Если это администратор, назначаем ему роль 'admin'
    if req.Email == "vainmannjas@gmail.com" {
        _, err = config.DB.Exec(
            "INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE role_name = 'admin'))",
            userId,
        )
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not assign role to admin"})
            return
        }
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func GetAllUsers(c *gin.Context) {
    rows, err := config.DB.Query(`
        SELECT u.id, u.username, u.email, COALESCE(json_agg(r.role_name) FILTER (WHERE r.role_name IS NOT NULL), '[]') 
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        GROUP BY u.id, u.username, u.email
    `)
    if err != nil {
        log.Printf("Error fetching users: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch users"})
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        var rolesJSON string
        if err := rows.Scan(&u.Id, &u.Username, &u.Email, &rolesJSON); err != nil {
            log.Printf("Error scanning user data: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Error scanning user data"})
            return
        }
        json.Unmarshal([]byte(rolesJSON), &u.Roles)
        users = append(users, u)
    }

    c.JSON(http.StatusOK, users)
}


func GetUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    err := config.DB.QueryRow("SELECT id, username, email FROM users WHERE id = $1", id).Scan(&user.Id, &user.Username, &user.Email) // Заменили name на username
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

    err := config.DB.QueryRow("INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id", user.Username, user.Email).Scan(&user.Id) // Заменили name на username
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

    _, err := config.DB.Exec("UPDATE users SET username = $1, email = $2 WHERE id = $3", user.Username, user.Email, id) // Заменили name на username
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
